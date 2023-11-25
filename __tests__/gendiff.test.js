/* eslint-disable no-undef */
/* eslint-disable quote-props */
import gendiff from '../src/compareJsons.js';

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

const json1 = {
  'host': 'hexlet.io',
  'timeout': 50,
  'proxy': '123.234.53.22',
  'follow': false,
};
const json2 = {
  'timeout': 20,
  'verbose': true,
  'host': 'hexlet.io',
};

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
