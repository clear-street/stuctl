import fs from 'fs';
import { Command, Option } from 'commander';
import dotenv from 'dotenv';
import { DEFAULT_URL, RCPATH } from './constants.js';

if (fs.existsSync(RCPATH)) {
  dotenv.config({ path: RCPATH });
}

export const addOptions = (cmd: Command): Command => {
  return cmd
    .addOption(
      new Option('-a, --account <account>', 'Account to operate in')
        .default(
          process.env.ACCOUNT,
          process.env.ACCOUNT ? `${process.env.ACCOUNT} (from environment variable)` : '<not set>'
        )
        .makeOptionMandatory(true)
    )
    .addOption(
      new Option('-u, --url <url>', 'The base URL to use for all requests')
        .default(
          process.env.URL || DEFAULT_URL,
          process.env.URL ? `${process.env.URL} (from environment variable)` : DEFAULT_URL
        )
        .makeOptionMandatory(true)
    )
};
