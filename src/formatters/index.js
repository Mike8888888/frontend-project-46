import stylish from './stylish.js';
import plain from './plain.js';

export default (options, diff) => {
  if (options.format === 'plain') {
    plain(diff);
  } else {
    stylish(diff);
  }
};
