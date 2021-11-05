import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const DIFF_RESOLVERS = {
  equal: {
    resolver: (key, _obj1, obj2) => ({ [`  ${key}`]: obj2[key] }),
  },
  updated: {
    resolver: (key, obj1, obj2) => ({ [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] }),
  },
  created: {
    resolver: (key, _obj1, obj2) => ({ [`+ ${key}`]: obj2[key] }),
  },
  deleted: {
    resolver: (key, obj1) => ({ [`- ${key}`]: obj1[key] }),
  },
};

const getObjectFromFileByPath = (inputPath) => {
  const filepath = path.isAbsolute(inputPath) ? inputPath : path.join(process.cwd(), inputPath);
  const fileBuffer = readFileSync(filepath);
  const fileParsedToJson = JSON.parse(fileBuffer);
  return fileParsedToJson;
};

const getTypeOfChange = (key, obj1, obj2) => {
  const initialValue = obj1[key];
  const finalValue = obj2[key];

  if (_.has(obj1, key) && _.has(obj2, key)) {
    return initialValue === finalValue ? 'equal' : 'updated';
  }

  if (_.has(obj1, key) && !_.has(obj2, key)) return 'deleted';

  return 'created';
};

const aggregateDifference = (acc, key, obj1, obj2) => {
  const typeOfChange = getTypeOfChange(key, obj1, obj2);
  const { resolver } = DIFF_RESOLVERS[typeOfChange];
  const differenceObject = _.merge(acc, resolver(key, obj1, obj2));
  return differenceObject;
};

const getDifferenceBetweenObjects = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = keys.sort();
  return sortedKeys.reduce((acc, key) => aggregateDifference(acc, key, obj1, obj2), {});
};

const generateDifference = (filepath1, filepath2) => {
  const obj1 = getObjectFromFileByPath(filepath1);
  const obj2 = getObjectFromFileByPath(filepath2);
  const difference = getDifferenceBetweenObjects(obj1, obj2);
  return difference;
};

export const outputDifferenceToConsole = (filepath1, filepath2) => {
  const difference = generateDifference(filepath1, filepath2);
  console.log(difference);
};

export default generateDifference;
