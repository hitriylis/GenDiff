import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const dataFile1 = readFileSync(path.resolve('__fixtures__', 'file1.json'), 'utf8');
const dataFile2 = readFileSync(path.resolve('__fixtures__', 'file2.json'), 'utf8');
const parsedDataFile1 = JSON.parse(dataFile1);
const parsedDataFile2 = JSON.parse(dataFile2);

const gendiffColl = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj1);
  const keys = _.union(keys1, keys2).sort();
  
  const result = keys.map((key) => {
    // if (!_.isPlainObject(key)) {
      if (!Object.hasOwn(obj1, key)) {
        return { key: key, value: obj2[key], status: 'added' };
      } else if (!Object.hasOwn(obj2, key)) {
        return { key: key, value: obj1[key], status: 'deleted' };
      } else if (obj1[key] !== obj2[key]) {
        return { key: key, value: obj1[key], status: 'changed' };
      } else if (obj1[key] === obj2[key]) {
        return { key: key, value: obj1[key], status: 'unchanged' };
      }
    // }
    // return { key: key, status: 'nested', children: gendiffColl(obj1[key], obj2[key]) };
  });
  return result;
};

const renderTree = (array) => {
  const tree = array.map(({ key, oldValue, value, status }) => {
    switch (status) {
      case 'added':
        return `  + ${key}: ${value}`;
      case 'deleted':
        return `  - ${key}: ${value}`;
      case 'changed':
        return `  - ${key}: ${oldValue}\n  + ${key}: ${value}`;      
      case 'unchanged':
        return `    ${key}: ${value}`;
    }
  });
  return `{\n${tree.join('\n')}\n}`;
};

const genDiff = () => renderTree(gendiffColl(parsedDataFile1, parsedDataFile2));
export default genDiff;
