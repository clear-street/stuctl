import readline from 'readline';
import axios, { AxiosError } from 'axios';
import chalk from 'chalk';
import { OptionValues } from 'commander';
import ora from 'ora';
import { getErrorString } from './errors.js';

export const placeOrder = async (
  side: 'buy' | 'sell' | 'sell-short',
  quantity: number,
  symbol: string,
  price: number,
  options: OptionValues,
  auth: string
) => {
  const { account, url, confirm } = options;

  const sideMap = {
    buy: chalk.green,
    sell: chalk.red,
    'sell-short': () => chalk.red('short'),
  }
  const displaySide = sideMap[side](side);
  const displaySymbol = chalk.magenta(symbol);
  const displayQuantity = chalk.bold(quantity);
  const displayPrice = chalk.bold(price);
  const displayAccount = chalk.cyan(account);

  if (confirm) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stderr,
    });

    await new Promise((resolve) => {
      console.error(
        `> Place ${displaySide} ${displayQuantity} ${displaySymbol} @ ${displayPrice} in account ${displayAccount}?`
      );
      rl.question(`> Enter YES to confirm, anything else to abort: `, (answer: string) => {
        if (answer === 'YES') {
          rl.close();
          resolve(null);
        } else {
          console.error('> Aborted');
          process.exit(0);
        }
      });
    });
  }

  const spinner = ora(
    `Placing ${displaySide} ${displayQuantity} ${displaySymbol} @ ${displayPrice} in account ${displayAccount}`
  ).start();

  try {
    const res = await axios.post(
      `${url}/v2/accounts/${account}/orders`,
      {
        order_type: 'limit',
        side: side,
        quantity: quantity,
        price: price,
        time_in_force: 'day',
        symbol: symbol,
        strategy_type: 'sor'
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    spinner.succeed(
      `Success, placed ${displaySide} ${displayQuantity} ${displaySymbol} @ ${displayPrice} in account ${displayAccount}! Your order-id: ${chalk.cyan(res.data.order_id)}`
    );
  } catch (e) {
    spinner.fail(`Failed to place order: ${getErrorString(e as AxiosError)}`);
  }
};
