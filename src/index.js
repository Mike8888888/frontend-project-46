import compareJsons from './compareJsons.js';
import parser from './parser.js';
import getStyledresult from './formatters/index.js';

export default (filepath1, filepath2, options) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const result = getStyledresult(options, compareJsons(obj1, obj2));
  return result;
};
