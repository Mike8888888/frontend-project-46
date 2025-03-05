/* eslint-disable no-undef */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = (filepath) => readFileSync(join(__dirname, '..', filepath), 'utf8');

const correctResult = readFile('__fixtures__/correctResult.txt');
const plainResult = readFile('__fixtures__/plainresult.txt');
const jsonResult = readFile('__fixtures__/jsonResult.txt');

test('Different JSONs', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toMatch(correctResult);
});

test('Default formatter', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toMatch(correctResult);
});

test('YAMLs', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(correctResult);
});

test('Plain format test', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(plainResult);
});

test('JSON format test', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(jsonResult);
});
