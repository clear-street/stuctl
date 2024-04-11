import { Command } from 'commander';
import ora from 'ora';
import { RCPATH, saveRCValue } from '../common/index.js';

const logout = () =>
  new Command('logout').description('Deletes stored token').action(async () => {
    const spinner = ora(`Logging out`).start();
    saveRCValue('AUTH', '');
    spinner.succeed(`Successfully removed token from ${RCPATH}`);
  });

export default logout;
