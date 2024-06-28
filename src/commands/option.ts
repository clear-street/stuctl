import { Argument, Command } from 'commander';
import { addOptions, saveRCValue } from '../common/index.js';
import ora from 'ora';

const option = () =>
    new Command('set')
      .description('Set default options')
      .addArgument(new Argument('<key>', 'The option key to set').choices(['account', 'url']))
      .argument('<value>', 'The option value to set')
      .action((key, value) => {
        const spinner = ora(`Saving ${key} to .sturc`).start();
        saveRCValue(key.toUpperCase(), value)
        spinner.succeed(`Saved ${key} to .sturc`);
      });

export default option;
