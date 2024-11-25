import _ from 'lodash';

function stylish(obj) {
  const replacer = ' ';
  const spaceCount = 4;
  const iter = (diff, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentForChangedValue = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - 4);
    if (!Array.isArray(diff)) {
      const keys = Object.keys(diff);
      const result = keys
        .sort((a, b) => a - b)
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
        if (!_.isObject(value)) {
          switch (state) {
            case 'deleted':
              return `${indentForChangedValue}- ${key}: ${value}`;
            case 'added':
              return `${indentForChangedValue}+ ${key}: ${value}`;
            default:
              return `${indentForChangedValue}  ${key}: ${value}`;
          }
        }
        switch (state) {
          case 'deleted':
            return `${indentForChangedValue}- ${key}: ${iter(value, depth + 1)}`;
          case 'added':
            return `${indentForChangedValue}+ ${key}: ${iter(value, depth + 1)}`;
          default:
            return `${indentForChangedValue}  ${key}: ${iter(value, depth + 1)}`;
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
