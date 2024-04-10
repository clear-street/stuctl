import { Command, OptionValues } from 'commander';
import { addOptions, authed, placeOrder } from '../common/index.js';

const sell = () =>
  addOptions(
    new Command('sell')
      .description('Place a sell order')
      .argument('<quantity>', 'quantity to sell')
      .argument('<symbol>', 'symbol to sell')
      .argument('<price>', 'price to sell at')
      .option('-n, --no-confirm', 'Do not ask for confirmation prior to submission')
      .action(
        authed(async (auth: string, quantity: number, symbol: string, price: number, options: OptionValues) => {
          await placeOrder('sell', quantity, symbol, price, options, auth);
        })
      )
  );

export default sell;
