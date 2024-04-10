import fs from 'fs';
import axios, { AxiosError } from 'axios';
import chalk from 'chalk';
import { Command, OptionValues } from 'commander';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ora from 'ora';
import { DEFAULT_AUTH_URL, getErrorString, RCPATH } from '../common/index.js';

const login = () =>
  new Command('login')
    .description('Set auth token from OAuth credentials file')
    .argument(
      '<filepath>',
      'Path to where your OAuth credentials file, typically named something like `clearstreet-api-xxxxxx.json`'
    )
    .option(
      '-au, --auth-url <auth-url>',
      'The URL for OAuth token issuance. The default value should work in production environments.',
      process.env['AUTH_URL'] ?? DEFAULT_AUTH_URL
    )
    .action(async (filepath: string, opt: OptionValues) => {
      const spinner = ora(`Reading credentials from ${filepath}`).start();
      fs.readFile(filepath, 'utf8', async (err, data) => {
        if (err) {
          spinner.fail(`Failed reading credentials from ${filepath}: ${err.message}`);
          return;
        }
        spinner.succeed(`Read credentials from ${filepath}`);

        spinner.start(`Requesting token from ${opt.authUrl}`);
        let token = '';
        try {
          const res = await axios.post(`${opt.authUrl}/oauth/token`, data, {
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
            },
          });
          token = res.data.access_token;
        } catch (e) {
          spinner.fail(`Failed requesting token from ${opt.authUrl}: ${getErrorString(e as AxiosError)}`);
          return;
        }
        spinner.succeed(`Token received from ${opt.authUrl}`);
        spinner.start(`Saving token to ${RCPATH}`);

        setEnvVariable('AUTH', token, RCPATH);
        const info = getExpiryStr(token);
        if (info) {
          spinner.succeed(
            `Token saved to ${RCPATH}, will expire at ${chalk.cyan(info.expiry)} (${chalk.yellow(info.remaining)} remaining)`
          );
        } else {
          spinner.succeed(`Token saved to ${RCPATH}`);
        }
      });
    });

const setEnvVariable = (key: string, value: string, path: string) => {
  const keyEquals = `${key}=`;
  const newEntry = `${keyEquals}${value}`;
  const regex = new RegExp(`^${keyEquals}.*$`, 'm');
  if (fs.existsSync(path)) {
    let env = fs.readFileSync(path, { encoding: 'utf8' });
    if (env.includes(keyEquals)) {
      // Replace existing entry
      env = env.replace(regex, newEntry);
    } else {
      // Add new entry
      env += newEntry;
    }
    fs.writeFileSync(path, env);
  } else {
    // Create new .env file
    fs.writeFileSync(path, newEntry);
  }
};

const getExpiryStr = (token: string): { remaining: string; expiry: string } | undefined => {
  const decoded = jwt.decode(token);
  if (!decoded || typeof decoded !== 'object') {
    return;
  }

  const payload = decoded as JwtPayload;
  if (!payload.exp) {
    return;
  }

  const now = new Date();
  const expiryDate = new Date(payload.exp * 1000);

  // Calculate the duration in milliseconds
  const durationMs = expiryDate.getTime() - now.getTime();

  // Convert the duration to hours, minutes and seconds
  const durationHrs = Math.floor(durationMs / 3600000);
  const durationMin = Math.floor((durationMs % 3600000) / 60000);
  const durationSec = Math.floor((durationMs % 60000) / 1000);

  // Format the duration as hh:mm:ss
  const formattedHrs = durationHrs.toString().padStart(2, '0');
  const formattedMin = durationMin.toString().padStart(2, '0');
  const formattedSec = durationSec.toString().padStart(2, '0');

  return {
    remaining: `${formattedHrs}:${formattedMin}:${formattedSec}`,
    expiry: expiryDate.toLocaleString(),
  };
};

export default login;
