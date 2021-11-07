import _ from 'lodash';

const kindToPlainMapper = {
  created: (_initialValue, finalValue) => `added with value: ${finalValue}`,
  deleted: () => 'removed',
  updated: (initialValue, finalValue) => `updated. From ${initialValue} to ${finalValue}`,
};

const isValueComplex = (value) => _.isObject(value);

const getValueOrComplexSign = (value) => {
  if (isValueComplex(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const generateLine = (pathToProperty, node) => {
  const { kind } = node;
  if (kind === 'equal') return null;
  if (kind === 'nested') {
    return node.children
      .map((elt) => generateLine([...pathToProperty, elt.key], elt))
      .filter((elt) => elt !== null)
      .join('\n');
  }
  const outputKind = kindToPlainMapper[kind];
  const fullPath = pathToProperty.length > 1 ? pathToProperty.join('.') : pathToProperty[0];
  const [initial, final] = [node.initialValue, node.finalValue].map(getValueOrComplexSign);
  return `Property '${fullPath}' was ${outputKind(initial, final)}`;
};

const plain = (difference) => {
  const lines = difference.map((elt) => generateLine([elt.key], elt)).filter((elt) => elt !== null);
  return lines.join('\n');
};

export default plain;
