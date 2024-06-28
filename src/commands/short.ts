import { Command, OptionValues } from 'commander';
import { addOptions, authed, placeOrder } from '../common/index.js';

const sell = () =>
  addOptions(
    new Command('short')
      .description('Place a sell short order')
      .argument('<quantity>', 'quantity to short')
      .argument('<symbol>', 'symbol to short')
      .argument('<price>', 'price to short at')
      .option('-n, --no-confirm', 'Do not ask for confirmation prior to submission')
      .action(
        authed(async (auth: string, quantity: number, symbol: string, price: number, options: OptionValues) => {
          await placeOrder('sell-short', quantity, symbol, price, options, auth);
        })
      )
  );

export default sell;
