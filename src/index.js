import { readFileSync } from 'fs';
import path from 'path';
import getParse from './parsers.js';
import makeAst from './buildAst.js';
import formatTree from './formatters/index.js';

const getExtension = (filename) => path.extname(filename).slice(1);

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = readFileSync(fullPath, 'utf8');
  return data;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = readFile(filepath1);
  const dataFile2 = readFile(filepath2);

  const parsedDataFile1 = getParse(dataFile1, getExtension(filepath1));
  const parsedDataFile2 = getParse(dataFile2, getExtension(filepath2));

  const diffTree = makeAst(parsedDataFile1, parsedDataFile2);
  return formatTree(diffTree, format);
};

export default genDiff;
