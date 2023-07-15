import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('stylish JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedJSON = readFile('expectedStylish.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedJSON);
});

test('stylish YMAL', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expectedYAML = readFile('expectedStylish.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedYAML);
});

test('stylish YML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedYML = readFile('expectedStylish.txt');
  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedYML);
});

test('plain JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedJSON = readFile('expectedPlain.txt');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedJSON);
});

test('plain YMAL', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expectedYAML = readFile('expectedPlain.txt');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedYAML);
});

test('plain YML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedYML = readFile('expectedPlain.txt');
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedYML);
});

test('json JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedJSON = readFile('expectedJSON.txt');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJSON);
});

test('json YMAL', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const expectedYAML = readFile('expectedJSON.txt');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedYAML);
});

test('json YML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedYML = readFile('expectedJSON.txt');
  expect(genDiff(file1, file2, 'json')).toEqual(expectedYML);
});
