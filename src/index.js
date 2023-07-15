import path from 'path';
import { readFileSync } from 'fs';
import getFileParse from './parsers.js';
import makeTree from './buildASTree.js';
import formatTree from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getFileType = (filename) => path.extname(filename).slice(1);

const getParsedData = (filePath) => {
  const fileType = getFileType(filePath);
  const fileData = readFileSync(filePath, 'utf-8');
  const parsedData = getFileParse(fileData, fileType);
  return parsedData;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const filePath1 = getPath(filepath1);
  const filePath2 = getPath(filepath2);

  const parsedDataFile1 = getParsedData(filePath1);
  const parsedDataFile2 = getParsedData(filePath2);

  const tree = makeTree(parsedDataFile1, parsedDataFile2);

  return formatTree(tree, format);
};

export default genDiff;
