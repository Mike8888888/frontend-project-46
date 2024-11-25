/* eslint-disable array-callback-return */
import _ from 'lodash';

function compareJsons(obj1, obj2) {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const result = [];
  keys.map((key) => {
    if (
      Object.hasOwn(obj1, key)
      && Object.hasOwn(obj2, key)
      && _.isObject(obj1[key])
      && _.isObject(obj2[key])) {
      result.push({
        key,
        value: compareJsons(obj1[key], obj2[key]),
        state: 'nested',
      });
    } else if (!Object.hasOwn(obj1, key)) {
      result.push({
        key,
        value: obj2[key],
        state: 'added',
      });
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({
        key,
        value: obj1[key],
        state: 'deleted',
      });
    } else if (obj1[key] !== obj2[key]) {
      result.push({
        key,
        value: obj1[key],
        state: 'deleted',
      });
      result.push({
        key,
        value: obj2[key],
        state: 'added',
      });
    } else {
      result.push({
        key,
        value: obj1[key],
        state: 'unchanged',
      });
    }
  });
  return result;
}

export default compareJsons;
