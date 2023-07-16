import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const plainExpected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff on plain JSON files', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(current).toEqual(plainExpected);
});

test('genDiff on plain YML files', () => {
  const current = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(current).toEqual(plainExpected);
});

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
