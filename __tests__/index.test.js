import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('stylish JSON Test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expectedFile.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
});

test('stylish YAML Test', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expected = readFile('expectedFile.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
});

test('stylish YML Test', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('expectedFile.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expected);
});
