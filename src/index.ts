#!/usr/bin/env node
import { program } from 'commander';
import buy from './commands/buy.js';
import cancel from './commands/cancel.js';
import cat from './commands/cat.js';
import login from './commands/login.js';
import sell from './commands/sell.js';
import watch from './commands/watch.js';

program
  .name('stuctl')
  .addCommand(buy())
  .addCommand(sell())
  .addCommand(cancel())
  .addCommand(watch())
  .addCommand(cat())
  .addCommand(login())
  .parse(process.argv);
