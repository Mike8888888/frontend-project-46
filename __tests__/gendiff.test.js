/* eslint-disable no-undef */
/* eslint-disable quote-props */
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import yaml from 'js-yaml';
import gendiff from '../src/compareJsons.js';

const readFile = (filePath) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf-8'));
const readYaml = (filePath) => yaml.load(fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8'));

const correctResult = [
  '- follow: false',
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
  '+ timeout: 20',
  '+ verbose: true',
];

const sameJson = [
  '  follow: false',
  '  host: hexlet.io',
  '  proxy: 123.234.53.22',
  '  timeout: 50',
];

const withEmptyJson = [
  '- follow: false',
  '- host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
];

const json1 = readFile('__fixtures__/file1.json');
const json2 = readFile('__fixtures__/file2.json');
const yaml1 = readYaml('__fixtures__/file1.yml');
const yaml2 = readYaml('__fixtures__/file2.yml');

const emptyJson = {};

test('Empty file', () => {
  expect(gendiff(json1, emptyJson)).toEqual(withEmptyJson);
});

test('Same JSONs', () => {
  expect(gendiff(json1, json1)).toEqual(sameJson);
});

test('Different JSONs', () => {
  expect(gendiff(json1, json2)).toEqual(correctResult);
});

test('YAMLs', () => {
  expect(gendiff(yaml1, yaml2)).toEqual(correctResult);
});
