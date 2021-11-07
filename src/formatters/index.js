import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (formatter) => {
  const formattersMapper = {
    stylish,
    plain,
    json,
  };

  return formattersMapper[formatter];
};
