#!/usr/bin/env node

import { Command } from 'commander';
import parseToObject from './parser.js';
import compareJsons from './compareJsons.js';
import stylish from './formatters/stylish.js';
import fs from 'node:fs';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = parseToObject(filepath1);
    const file2 = parseToObject(filepath2);
    const diff = compareJsons(file1, file2)
    console.log(stylish(diff));
  });

program.parse();

export default program;
