#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.parse();
