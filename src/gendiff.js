#!/usr/bin/env node

import { Command } from 'commander';
import compareJsons from './compareJsons.js';
import stylish from './formatters/stylish.js';
import parser from './parser.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const obj1 = parser(filepath1);
    const obj2 = parser(filepath2);
    if (options.format === 'plain') {
      console.log('plain formatter in progress');
    } else {
      console.log(stylish(compareJsons(obj1, obj2)));
    }
    console.log();
  });

program.parse();

export default program;
