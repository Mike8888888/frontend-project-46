import fs from 'node:fs';
import compareJsons from '../compareJsons.js';
import parser from '../parser.js';

function plain(obj) {
  const iter = (diff, ancestorArray) => {
    const result = diff
      .sort((a, b) => {
        const firstValue = a.key;
        const secondValue = b.key;
        if (firstValue > secondValue) {
          return 1;
        }
        if (secondValue > firstValue) {
          return -1;
        }
        return 0;
      })
      .map(({ key, value, state }) => {
        if (state === 'nested') {
          return iter(value, [...key]);
        } else if (state === ' ') {
          
        }
      });
  };
  return iter(obj, []);
}

const json1 = parser('__fixtures__/file1.json');
const json2 = parser('__fixtures__/file2.json');
console.log(JSON.stringify(compareJsons(json1, json2), ' ', 2));
fs.writeFileSync('file1.txt', JSON.stringify(compareJsons(json1, json2), ' ', 2), 'utf8');
export default plain;
