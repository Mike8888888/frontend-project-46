#!/usr/bin/env node

import { Command } from 'commander';
import compareJsons from './compareJsons.js';
import parser from './parser.js';
import getStyledResult from './formatters/index.js';

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
    console.log(getStyledResult(options, compareJsons(obj1, obj2)));
  });

program.parse();

export default program;
