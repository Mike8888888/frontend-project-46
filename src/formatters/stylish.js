import _ from 'lodash';

const isNotComparedDiff = (diff) => !Array.isArray(diff);

const formatLine = (key, value, state, indent, depth, iter) => {
  switch (state) {
    case 'added':
      return `${indent}+ ${key}: ${_.isObject(value) ? iter(value, depth + 1) : value}`;
    case 'deleted':
      return `${indent}- ${key}: ${_.isObject(value) ? iter(value, depth + 1) : value}`;
    case 'unchanged':
    case 'nested':
      return `${indent}  ${key}: ${_.isObject(value) ? iter(value, depth + 1) : value}`;
    default:
      throw new Error('Invalid state encountered');
  }
};

function stylish(obj, spaceCount = 4) {
  const replacer = ' ';
  const iter = (diff, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentForChangedValue = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - 4);

    if (isNotComparedDiff(diff)) {
      const keys = Object.keys(diff);
      const result = keys.map((key) => `${currentIndent}${key}: ${_.isObject(diff[key]) ? iter(diff[key], depth + 1) : diff[key]}`);
      return ['{', ...result, `${bracketIndent}}`].join('\n');
    }

    const result = diff.sort((a, b) => a.key.localeCompare(b.key))
      .map(({
        key, value, state, value2,
      }) => {
        if (state === 'updated') {
          return [
            formatLine(key, value, 'deleted', indentForChangedValue, depth, iter),
            formatLine(key, value2, 'added', indentForChangedValue, depth, iter),
          ].join('\n');
        }
        return formatLine(key, value, state, indentForChangedValue, depth, iter);
      });

    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };

  return iter(obj, 1);
}

export default stylish;
