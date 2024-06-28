#!/usr/bin/env node
import { program } from 'commander';
import buy from './commands/buy.js';
import short from './commands/short.js';
import cancel from './commands/cancel.js';
import cat from './commands/cat.js';
import login from './commands/login.js';
import logout from './commands/logout.js';
import sell from './commands/sell.js';
import watch from './commands/watch.js';
import option from './commands/option.js';

program
  .name('stuctl')
  .addCommand(buy())
  .addCommand(sell())
  .addCommand(short())
  .addCommand(cancel())
  .addCommand(watch())
  .addCommand(cat())
  .addCommand(login())
  .addCommand(logout())
  .addCommand(option())
  .parse(process.argv);
