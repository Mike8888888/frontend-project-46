import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import compareJsons from './compareJsons.js';
import parser from './parser.js';
import getStyledresult from './formatters/index.js';

export default (filepath1, filepath2, options = 'stylish') => {
  const file1 = readFileSync(resolve(cwd(), filepath1), 'utf8');
  const file2 = readFileSync(resolve(cwd(), filepath2), 'utf8');
  const obj1 = parser(file1, extname(filepath1));
  const obj2 = parser(file2, extname(filepath2));
  return getStyledresult(options, compareJsons(obj1, obj2));
};
