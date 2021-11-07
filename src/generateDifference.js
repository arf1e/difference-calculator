import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import getParserByExtension from './parsers.js';
import getFormatterByFormat from './formatters/index.js';

const DIFF_RESOLVERS = [
  {
    kind: 'nested',
    condition: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    resolver: (key, obj1, obj2, iterator) => ({ children: iterator(obj1[key], obj2[key]) }),
  },
  {
    kind: 'equal',
    condition: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    resolver: (key, obj1) => ({ finalValue: obj1[key] }),
  },
  {
    kind: 'updated',
    condition: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    resolver: (key, obj1, obj2) => ({ initialValue: obj1[key], finalValue: obj2[key] }),
  },
  {
    kind: 'created',
    condition: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    resolver: (key, _obj1, obj2) => ({ finalValue: obj2[key] }),
  },
  {
    kind: 'deleted',
    condition: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    resolver: (key, obj1) => ({ initialValue: obj1[key] }),
  },
];

const aggregateDifference = (acc, key, obj1, obj2, iterator) => {
  const { kind, resolver } = DIFF_RESOLVERS.find((element) => element.condition(key, obj1, obj2));
  return [...acc, { kind, key, ...resolver(key, obj1, obj2, iterator) }];
};

function getDifferenceBetweenObjects(obj1, obj2) {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = keys.sort();
  const changes = sortedKeys.reduce((acc, key) => {
    const iterator = getDifferenceBetweenObjects;
    return aggregateDifference(acc, key, obj1, obj2, iterator);
  }, []);
  return changes;
}

const getObjectFromFileByPath = (inputPath) => {
  const filepath = path.isAbsolute(inputPath) ? inputPath : path.join(process.cwd(), inputPath);
  const ext = path.extname(filepath);
  const parse = getParserByExtension(ext);
  const fileBuffer = readFileSync(filepath, 'utf-8');
  const fileParsedToObject = parse(fileBuffer);
  return fileParsedToObject;
};

const getFormattedDifference = (difference, formatter) => {
  const output = formatter(difference);
  return output;
};

const generateDifference = (filepath1, filepath2, formatName = 'stylish') => {
  const formatter = getFormatterByFormat(formatName);
  const obj1 = getObjectFromFileByPath(filepath1);
  const obj2 = getObjectFromFileByPath(filepath2);
  const difference = getDifferenceBetweenObjects(obj1, obj2);
  const formattedDifference = getFormattedDifference(difference, formatter);
  return formattedDifference;
};

export default generateDifference;
