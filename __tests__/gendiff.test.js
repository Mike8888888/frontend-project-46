/* eslint-disable no-undef */
/* eslint-disable quote-props */
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import yaml from 'js-yaml';
import gendiff from '../src/gendiff.js';

const readFile = (filePath) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8'));
const readYaml = (filePath) => yaml.load(fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8'));

const correctResult = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';

const json1 = readFile('__fixtures__/file1.json');
const json2 = readFile('__fixtures__/file2.json');
const yaml1 = readYaml('__fixtures__/file1.yml');
const yaml2 = readYaml('__fixtures__/file2.yml');

test('Different JSONs', () => {
  expect(gendiff(json1, json2)).toEqual(correctResult);
});

test('YAMLs', () => {
  expect(gendiff(yaml1, yaml2)).toEqual(correctResult);
});
