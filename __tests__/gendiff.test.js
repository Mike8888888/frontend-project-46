/* eslint-disable no-undef */
import genDiff from '../src/index.js';
import * as result from '../__fixtures__/testAnswers.js';

test('Different JSONs', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toMatch(result.correctResult);
});

test('YAMLs', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(result.correctResult);
});

test('Plain format test', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(result.plainFormatResult);
});

test('JSON format test', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(result.jsonResult);
});
