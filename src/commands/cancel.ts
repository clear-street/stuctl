import axios, { AxiosError } from 'axios';
import { Command, OptionValues } from 'commander';
import ora from 'ora';
import { addOptions, authed, getErrorString } from '../common/index.js';

const cancel = () =>
  addOptions(
    new Command('cancel')
      .description('Place a cancel request')
      .argument('<order-id>', 'order-id of the order you want to cancel')
      .action(
        authed(async (auth: string, orderId: string, options: OptionValues) => {
          const { account, url } = options;
          const spinner = ora(`Cancelling order ${orderId}`).start();

          try {
            await axios.delete(`${url}/v2/accounts/${account}/orders/${orderId}`, {
              headers: {
                Authorization: `Bearer ${auth}`,
              },
            });

            spinner.succeed(`Success! Cancel requested for order ${orderId}`);
          } catch (e) {
            spinner.fail(`Failed to place cancel: ${getErrorString(e as AxiosError)}`);
          }
        })
      )
  );

export default cancel;
