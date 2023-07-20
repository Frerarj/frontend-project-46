import fs from 'fs';
import path from 'path';

import compare from './compare.js';
import makeFormatting from './formatters/index.js';
import parser from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFileExtention = (filepath) => filepath.split('.')[1];

const genDiff = (file1, file2, formatting = 'stylish') => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const data1 = parser(content1, getFileExtention(file1));
  const data2 = parser(content2, getFileExtention(file2));
  const tree = compare(data1, data2);

  return makeFormatting(tree, formatting);
};

export default genDiff;
