import _ from 'lodash';

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
  const lines = getSortedKeysArray(diff).flatMap(({
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
