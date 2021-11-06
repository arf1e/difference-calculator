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
      let output;
      if (node.kind === 'nested') {
        output = `${indentation}  ${key}: {\n${iter(node.children, nextLevelDepth).join('')}${indent(depth)}}\n`;
      }
      if (node.kind === 'updated') {
        output = decomposeUpdatedNode(node, indentation, initialValue, finalValue);
      }
      if (node.kind === 'created') {
        output = generateLine(indentation, '+', key, finalValue);
      }
      if (node.kind === 'deleted') {
        output = generateLine(indentation, '-', key, initialValue);
      }
      if (node.kind === 'equal') {
        output = generateLine(indentation, ' ', key, finalValue);
      }
      return output;
    });
  };
  return `{\n${iter(difference, 0).join('')}}`;
};

export default stylish;
