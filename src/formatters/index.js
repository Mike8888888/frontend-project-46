/* eslint-disable no-else-return */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (options, diff) => {
  switch (options) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error('Unknown format!');
  }
};
