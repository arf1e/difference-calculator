import _ from 'lodash';

export const ONE_LEVEL_INDENT = 4;
export const HALF_LEVEL_INDENT = ONE_LEVEL_INDENT / 2;

export const indent = (depth, indentation = ONE_LEVEL_INDENT) => _.repeat(' ', indentation + depth);

const stringify = (node, depthLevel) => {
  const iter = (current, depth) => {
    if (!_.isObject(current)) {
      return `${current}`;
    }
    if (current === null) {
      return null;
    }
    const entries = Object.entries(current);
    const indentation = depth + ONE_LEVEL_INDENT;
    const lines = entries.map(([key, value]) => `${indent(indentation)}${key}: ${iter(value, indentation)}`);
    return ['{', ...lines, `${indent(depth)}}`].join('\n');
  };

  return iter(node, depthLevel);
};

export default stringify;
