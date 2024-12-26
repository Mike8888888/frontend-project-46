/* eslint-disable no-else-return */
import _ from 'lodash';

const isNotComparedDiff = (diff) => !Array.isArray(diff);
const getSortedKeysArray = (keys) => {
  const result = keys.toSorted((a, b) => {
    const firstValue = a.key;
    const secondValue = b.key;
    if (firstValue > secondValue) {
      return 1;
    }
    if (secondValue > firstValue) {
      return -1;
    }
    return 0;
  });
  return result;
};

const getUpdatedCase = (value, value2) => {
  if (_.isObject(value) && _.isObject(value2)) {
    return 'both objects';
  } else if (!_.isObject(value) && _.isObject(value2)) {
    return 'value 2 object';
  } else if (_.isObject(value) && !_.isObject(value2)) {
    return 'value 1 object';
  } else {
    return 'both not object';
  }
};

function stylish(obj) {
  const replacer = ' ';
  const spaceCount = 4;
  const iter = (diff, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentForChangedValue = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - 4);
    if (isNotComparedDiff(diff)) {
      const keys = Object.keys(diff);
      const result = keys
        .toSorted()
        .map((key) => {
          if (!_.isObject(diff[key])) {
            return `${currentIndent}${key}: ${diff[key]}`;
          }
          return `${currentIndent}${key}: ${iter(diff[key], depth + 1)}`;
        });
      return [
        '{',
        ...result,
        `${bracketIndent}}`,
      ].join('\n');
    }
    const result = getSortedKeysArray(diff)
      .map(({
        key, value, state, value2,
      }) => {
        if (state === 'updated') {
          switch (getUpdatedCase(value, value2)) {
            case 'both objects':
              return `${indentForChangedValue}- ${key}: ${iter(value, depth + 1)}\n${indentForChangedValue}+ ${key}: ${iter(value2, depth + 1)}`;
            case 'value 2 object':
              return `${indentForChangedValue}- ${key}: ${value}\n${indentForChangedValue}+ ${key}: ${iter(value2, depth + 1)}`;
            case 'value 1 object':
              return `${indentForChangedValue}- ${key}: ${iter(value, depth + 1)}\n${indentForChangedValue}+ ${key}: ${value2}`;
            case 'both not object':
              return `${indentForChangedValue}- ${key}: ${value}\n${indentForChangedValue}+ ${key}: ${value2}`;
            default:
              console.error('Not valid case for updated');
          }
        }
        if (!_.isObject(value)) {
          switch (state) {
            case 'deleted':
              return `${indentForChangedValue}- ${key}: ${value}`;
            case 'added':
              return `${indentForChangedValue}+ ${key}: ${value}`;
            case 'unchanged':
              return `${indentForChangedValue}  ${key}: ${value}`;
            default:
              return console.log('Not valid state');
          }
        }
        switch (state) {
          case 'deleted':
            return `${indentForChangedValue}- ${key}: ${iter(value, depth + 1)}`;
          case 'added':
            return `${indentForChangedValue}+ ${key}: ${iter(value, depth + 1)}`;
          case 'unchanged':
            return `${indentForChangedValue}  ${key}: ${iter(value, depth + 1)}`;
          case 'nested':
            return `${indentForChangedValue}  ${key}: ${iter(value, depth + 1)}`;
          default:
            return console.error('Not valid state');
        }
      });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(obj, 1);
}

export default stylish;
