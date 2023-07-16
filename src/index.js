import fs from 'fs';
import path from 'path';

import compare from './compare.js';
import makeFinalView from './formatting.js';
import parser from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFileExtention = (filepath) => path.extname(filepath);

const genDiff = (file1, file2) => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const data1 = parser(content1, getFileExtention(file1));
  const data2 = parser(content2, getFileExtention(file2));
  const tree = compare(data1, data2);

  return makeFinalView(tree);
};

export default genDiff;
