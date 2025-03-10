import _ from 'lodash';

const depthIndent = 4;

function currentIndent(depth) {
  return ' '.repeat(depth * depthIndent - 2);
}

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => (
      `${currentIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
    ));
  return ['{', ...lines, `${currentIndent(depth)}  }`].join('\n');
};

export default (obj) => {
  const iter = (diff, depth) => diff.map((node) => {
    switch (node.state) {
      case 'added':
        return `${currentIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}\n`;
      case 'deleted':
        return `${currentIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}\n`;
      case 'unchanged':
        return `${currentIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}\n`;
      case 'updated':
        return `${currentIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}\n${currentIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}\n`;
      case 'nested':
        return `${currentIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${currentIndent(depth)}  }\n`;
      default:
        throw new Error('Type is not defined');
    }
  });
  return `{\n${iter(obj, 1).join('')}}`;
};
