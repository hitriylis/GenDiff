import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const dataFile1 = readFileSync(path.resolve('__fixtures__', 'file1.json'), 'utf8');
const dataFile2 = readFileSync(path.resolve('__fixtures__', 'file2.json'), 'utf8');
const parsedDataFile1 = JSON.parse(getDataFile1);
const parsedDataFile2 = JSON.parse(getDataFile2);

console.log('parsedDataFile1:', parsedDataFile1)
console.log('parsedDataFile2:', parsedDataFile2)
console.log('____________')

const gendiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  console.log('keys:', keys);
  console.log('____________');
  
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
    // return { key: key, status: 'nested', children: gendiff(obj1[key], obj2[key]) };
  });
  return result;
};

export default gendiff;
