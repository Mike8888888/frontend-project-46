#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.parse();

/*program
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();

  
  Usage: gendiff [options]

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -h, --help           output usage information

    program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')

  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });*/