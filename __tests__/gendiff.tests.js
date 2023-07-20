import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const stylish = [
  ['nestedFile1.json', 'nestedFile2.json', 'expected-stylish.txt'],
  ['nestedFile1.yml', 'nestedFile2.yml', 'expected-stylish.txt'],
  ['nestedFile1.yml', 'nestedFile2.json', 'expected-stylish.txt'],
];

const plain = [
  ['nestedFile1.json', 'nestedFile2.json', 'expected-plain.txt'],
  ['nestedFile1.yml', 'nestedFile2.yml', 'expected-plain.txt'],
  ['nestedFile1.yml', 'nestedFile2.json', 'expected-plain.txt'],
];

const json = [
  ['nestedFile1.json', 'nestedFile2.json', 'expected-json.txt'],
  ['nestedFile1.yml', 'nestedFile2.yml', 'expected-json.txt'],
  ['nestedFile1.yml', 'nestedFile2.json', 'expected-json.txt'],
];

test.each(stylish)(
  'Find difference between %s and %s, make stylish',
  (fileName1, fileName2, expectedResult) => {
    const expected = readFile(expectedResult);
    const filepath1 = getFixturePath(fileName1);
    const filepath2 = getFixturePath(fileName2);
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  },
);

test.each(plain)(
  'Find difference between %s and %s, make plain',
  (fileName1, fileName2, expectedResult) => {
    const expected = readFile(expectedResult);
    const filepath1 = getFixturePath(fileName1);
    const filepath2 = getFixturePath(fileName2);
    const result = genDiff(filepath1, filepath2, 'plain');
    expect(result).toEqual(expected);
  },
);

test.each(json)(
  'Find difference between %s and %s, make json',
  (fileName1, fileName2, expectedResult) => {
    const expected = readFile(expectedResult);
    const filepath1 = getFixturePath(fileName1);
    const filepath2 = getFixturePath(fileName2);
    const result = genDiff(filepath1, filepath2, 'json');
    expect(result).toEqual(expected);
  },
);
