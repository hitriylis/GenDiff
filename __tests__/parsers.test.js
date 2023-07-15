import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import getFileParse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('getFileParse', () => {
  const data = readFile('file1.txt');
  const ext = 'txt';
  expect(getFileParse(data, ext)).toEqual(new Error(`Unknown extension: '${ext}'!`));
});
