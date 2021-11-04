import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const getObjectFromFileByPath = (inputPath) => {
  const filepath = path.isAbsolute(inputPath) ? inputPath : path.join(process.cwd(), inputPath);
  const fileBuffer = readFileSync(filepath);
  const fileParsedToJson = JSON.parse(fileBuffer);
  return fileParsedToJson;
};

const getDifferenceBetweenObjects = (obj1, obj2) => {
  const sum = { ...obj1, ...obj2 };

  const sortedKeys = _.sortBy(Object.keys(sum), (elt) => elt);

  const result = sortedKeys.reduce((acc, key) => {
    const initialValue = obj1[key];
    const finalValue = obj2[key];

    const firstObjectHasValue = _.has(obj1, key);
    const secondObjectHasValue = _.has(obj2, key);

    const isValueDeleted = firstObjectHasValue && !secondObjectHasValue;
    const isValueCreated = !firstObjectHasValue && secondObjectHasValue;
    const bothHaveValue = firstObjectHasValue && secondObjectHasValue;
    const valuesAreEqual = initialValue === finalValue;

    if (isValueDeleted) {
      acc[`- ${key}`] = initialValue;
    }

    if (bothHaveValue) {
      if (valuesAreEqual) {
        acc[`  ${key}`] = initialValue;
      } else {
        acc[`- ${key}`] = initialValue;
        acc[`+ ${key}`] = finalValue;
      }
    }

    if (isValueCreated) {
      acc[`+ ${key}`] = finalValue;
    }

    return acc;
  }, {});

  return result;
};

const generateDifference = (filepath1, filepath2) => {
  const obj1 = getObjectFromFileByPath(filepath1);
  const obj2 = getObjectFromFileByPath(filepath2);
  const difference = getDifferenceBetweenObjects(obj1, obj2);
  return difference;
};

const outputDifferenceToConsole = (filepath1, filepath2) => {
  const difference = generateDifference(filepath1, filepath2);
  console.log(difference);
};

export default outputDifferenceToConsole;
