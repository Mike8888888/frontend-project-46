#!/usr/bin/env node

import { Command } from 'commander';
import path from 'node:path';
import parseToJson from './parseToJson.js';
import compareJsons from './compareJsons.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = parseToJson(filepath1);
    const file2 = parseToJson(filepath2);
    console.log(compareJsons(file1, file2));
    /*console.log(typeof file1);
    console.log(file2);
    console.log(path.resolve(process.cwd(), filepath1));
    console.log(path.resolve(filepath1));*/
  });

program.parse();
