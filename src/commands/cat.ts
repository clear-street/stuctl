import { Command, OptionValues } from 'commander';
import ora from 'ora';
import WebSocket from 'ws';
import { addOptions, authed } from '../common/index.js';

const cat = () =>
  addOptions(
    new Command('cat').description('Cat your trading activity').action(
      authed(async (auth: string, options: OptionValues) => {
        const { account, url } = options;
        const ws = new WebSocket(`${url}/v2/ws`);
        const spinner = ora(`Connecting to ${url}/v2/ws`).start();

        ws.on('message', (data: WebSocket.Data) => {
          const json = JSON.parse(data.toString());
          console.log(JSON.stringify(json));
        });

        ws.on('open', () => {
          spinner.succeed('Connected to websocket!');
          const subscribe = {
            authorization: auth,
            payload: {
              type: 'subscribe-activity',
              account_id: account,
            },
          };
          ws.send(JSON.stringify(subscribe));
        });

        ws.on('close', () => {
          spinner.fail('Connected closed');
        });

        ws.on('error', (err: Error) => {
          spinner.fail('Connection error: ' + err.message);
        });
      })
    )
  );

export default cat;
