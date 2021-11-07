import stylish from './stylish.js';
import plain from './plain.js';

export default (formatter) => {
  const formattersMapper = {
    stylish,
    plain,
  };

  return formattersMapper[formatter];
};
