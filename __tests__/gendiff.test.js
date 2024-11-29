/* eslint-disable no-undef */
import parser from '../src/parser.js';
import stylish from '../src/formatters/stylish.js';
import compareJsons from '../src/compareJsons.js';

const correctResult = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';

const json1 = parser('__fixtures__/file1.json');
const json2 = parser('__fixtures__/file2.json');
const yaml1 = parser('__fixtures__/file1.yml');
const yaml2 = parser('__fixtures__/file2.yml');

test('Different JSONs', () => {
  expect(stylish(compareJsons(json1, json2))).toEqual(correctResult);
});

test('YAMLs', () => {
  expect(stylish(compareJsons(yaml1, yaml2))).toEqual(correctResult);
});
