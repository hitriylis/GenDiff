import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const makeDiffColl = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const tree = keys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: makeDiffColl(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  });
  return tree;
};

const renderDiffTree = (array) => {
  const tree = array.map(({
    key, oldValue, newValue, value, status,
  }) => {
    switch (status) {
      case 'added':
        return `  + ${key}: ${value}`;
      case 'deleted':
        return `  - ${key}: ${value}`;
      case 'changed':
        return `  - ${key}: ${oldValue}\n  + ${key}: ${newValue}`;
      case 'unchanged':
        return `    ${key}: ${value}`;
      default:
        throw new Error('Error');
    }
  });
  return `{\n${tree.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const currentDirectory = process.cwd();
  const resolvedFilepath1 = path.resolve(currentDirectory, filepath1);
  const resolvedFilepath2 = path.resolve(currentDirectory, filepath2);

  const dataFile1 = readFileSync(resolvedFilepath1, 'utf8');
  const dataFile2 = readFileSync(resolvedFilepath2, 'utf8');
  const parsedDataFile1 = JSON.parse(dataFile1);
  const parsedDataFile2 = JSON.parse(dataFile2);

  const diffColl = makeDiffColl(parsedDataFile1, parsedDataFile2);
  const diffTree = renderDiffTree(diffColl);
  return diffTree;
};

export default genDiff;
