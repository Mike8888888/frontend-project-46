import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (options, diff) => {
  let result;
  if (options.format === 'plain') {
    result = plain(diff);
  } else if (options.format === 'json') {
    result = json(diff);
  } else {
    result = stylish(diff);
  }
  return result;
};
