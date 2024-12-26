/* eslint-disable no-else-return */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (options, diff) => {
  if (options === 'plain') {
    return plain(diff);
  } else if (options === 'json') {
    return json(diff);
  } else {
    return stylish(diff);
  }
};
