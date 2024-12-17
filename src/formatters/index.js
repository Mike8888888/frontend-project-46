import stylish from './stylish.js';
import plain from './plain.js';
import JSON from './json.js';

export default (options, diff) => {
  let result;
  if (options.format === 'plain') {
    result = plain(diff);
  } else if (options.format === 'JSON') {
    result = JSON(diff);
  } else {
    result = stylish(diff);
  }
  return result;
};
