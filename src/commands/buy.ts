import { Command, OptionValues } from 'commander';
import { addOptions, authed, placeOrder } from '../common/index.js';

const buy = () =>
  addOptions(
    new Command('buy')
      .description('Place a buy order')
      .argument('<quantity>', 'The quantity to buy')
      .argument('<symbol>', 'The symbol to buy')
      .argument('<price>', 'The limit price on the order')
      .option('-n, --no-confirm', 'Do not ask for confirmation prior to submission')
      .action(
        authed(async (auth: string, quantity: number, symbol: string, price: number, options: OptionValues) => {
          await placeOrder('buy', quantity, symbol, price, options, auth);
        })
      )
  );

export default buy;
