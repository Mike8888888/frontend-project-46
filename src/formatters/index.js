import stylish from './stylish.js';
import plain from './plain.js';

export default (options, diff) => {
  if (options.format === 'plain') {
    return plain(diff);
  } else {
    return stylish(diff);
  }
};
