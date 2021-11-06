import stylish from './stylish.js';

export default (formatter) => {
  const formattersMapper = {
    stylish,
  };

  return formattersMapper[formatter];
};
