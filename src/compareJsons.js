/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import _ from 'lodash';

function compareJsons(obj1, obj2) {
  const keys = Object.keys({ ...obj1, ...obj2 });
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
      } else if (!Object.hasOwn(obj1, key)) {
        return [
          ...result, {
            key,
            value: obj2[key],
            state: 'added',
          },
        ];
      } else if (!Object.hasOwn(obj2, key)) {
        return [
          ...result, {
            key,
            value: obj1[key],
            state: 'deleted',
          },
        ];
      } else if (obj1[key] !== obj2[key]) {
        return [
          ...result, {
            key,
            value: obj1[key],
            value2: obj2[key],
            state: 'updated',
          },
        ];
      } else {
        return [
          ...result, {
            key,
            value: obj1[key],
            state: 'unchanged',
          },
        ];
      }
    };

    const ast = keys.reduce(cb, []);
    return ast;
  }
  return getAST(keys);
}

export default compareJsons;
