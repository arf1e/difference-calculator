import stringify, { ONE_LEVEL_INDENT, HALF_LEVEL_INDENT, indent } from './stringify.js';

const generateLine = (indentation, mark, key, value) => `${indentation}${mark} ${key}: ${value}\n`;

const decomposeUpdatedNode = (node, indentation, initialValue, finalValue) => {
  const { key } = node;
  return [generateLine(indentation, '-', key, initialValue), generateLine(indentation, '+', key, finalValue)].join('');
};

const stylish = (difference) => {
  const iter = (tree, depth) => {
    const indentation = indent(depth - HALF_LEVEL_INDENT);
    const nextLevelDepth = depth + ONE_LEVEL_INDENT;
    return tree.map((node) => {
      const { key } = node;
      const initialValue = stringify(node.initialValue, depth);
      const finalValue = stringify(node.finalValue, depth);
      if (node.kind === 'nested') {
        return `${indentation}  ${key}: {\n${iter(node.children, nextLevelDepth).join('')}${indent(depth)}}\n`;
      }
      if (node.kind === 'updated') {
        return decomposeUpdatedNode(node, indentation, initialValue, finalValue);
      }
      if (node.kind === 'created') {
        return generateLine(indentation, '+', key, finalValue);
      }
      if (node.kind === 'deleted') {
        return generateLine(indentation, '-', key, initialValue);
      }
      return generateLine(indentation, ' ', key, finalValue);
    });
  };
  return `{\n${iter(difference, 0).join('')}}`;
};

export default stylish;
