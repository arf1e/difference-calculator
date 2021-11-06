#!/usr/bin/env node

import { Command } from 'commander';
import generateDifference from '../src/generateDifference.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(generateDifference(filepath1, filepath2, options));
  });

program.parse();
