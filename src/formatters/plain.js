import _ from 'lodash';

function formatValue(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
}

function formatDiff(diff, path = '') {
  const lines = diff.flatMap(({
    key, value, value2, state,
  }) => {
    const propertyPath = path ? `${path}.${key}` : key;

    switch (state) {
      case 'nested':
        return formatDiff(value, propertyPath);
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(value)}`;
      case 'deleted':
        return `Property '${propertyPath}' was removed`;
      case 'updated':
        return `Property '${propertyPath}' was updated. From ${formatValue(value)} to ${formatValue(value2)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  });

  return lines.filter(Boolean).join('\n');
}

export default formatDiff;
