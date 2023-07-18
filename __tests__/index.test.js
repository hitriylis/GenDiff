import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const expectedJSON = readFile('expectedJSON.txt');
const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const extensions = ['yml', 'yaml', 'json'];

test.each(extensions)('genDiff test', (file1, file2) => {
  const [ext] = extensions;
  const fileBefore = getFixturePath(`${file1}.${ext}`);
  const fileAfter = getFixturePath(`${file2}.${ext}`);
  expect(genDiff(fileBefore, fileAfter, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toEqual(expectedPlain);
  expect(genDiff(fileBefore, fileAfter, 'json')).toEqual(expectedJSON);
  expect(genDiff(fileBefore, fileAfter, '')).toEqual(expectedStylish);
});
