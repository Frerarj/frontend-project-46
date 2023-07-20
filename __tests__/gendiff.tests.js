import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

test('genDiff on nested JSON files', () => {
  const current = genDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.json'));
  const expected = readFile('expected-stylish.txt');
  expect(current).toEqual(expected);
});

test('genDiff on nested YML files', () => {
  const current = genDiff(getFixturePath('nestedFile1.yml'), getFixturePath('nestedFile2.yml'));
  const expected = readFile('expected-stylish.txt');
  expect(current).toEqual(expected);
});

test('genDiff plain formatting on nested JSON & YML files', () => {
  const current = genDiff(getFixturePath('nestedFile1.json'), getFixturePath('nestedFile2.yml'), 'plain');
  const expected = readFile('expected-plain.txt');
  expect(current).toEqual(expected);
});

test('genDiff JSON formatting on nested JSON & YML files', () => {
  const current = genDiff(getFixturePath('nestedFile1.yml'), getFixturePath('nestedFile2.json'), 'json');
  const expected = readFile('expected-json.txt');
  expect(current).toEqual(expected);
});
