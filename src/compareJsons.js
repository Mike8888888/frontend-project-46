import _ from 'lodash';

function compareJsons(obj1, obj2) {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  const keysSorted = _.sortBy(allKeys);

  function getAST(keys) {
    const cb = (result, key) => {
      if (
        Object.hasOwn(obj1, key)
        && Object.hasOwn(obj2, key)
        && _.isObject(obj1[key])
        && _.isObject(obj2[key])) {
        return [
          ...result, {
            key,
            value: compareJsons(obj1[key], obj2[key]),
            state: 'nested',
          },
        ];
      } if (!Object.hasOwn(obj1, key)) {
        return [
          ...result, {
            key,
            value: obj2[key],
            state: 'added',
          },
        ];
      } if (!Object.hasOwn(obj2, key)) {
        return [
          ...result, {
            key,
            value: obj1[key],
            state: 'deleted',
          },
        ];
      } if (obj1[key] !== obj2[key]) {
        return [
          ...result, {
            key,
            value: obj1[key],
            value2: obj2[key],
            state: 'updated',
          },
        ];
      }
      return [
        ...result, {
          key,
          value: obj1[key],
          state: 'unchanged',
        },
      ];
    };

    const ast = keys.reduce(cb, []);
    return ast;
  }
  return getAST(keysSorted);
}

export default compareJsons;
