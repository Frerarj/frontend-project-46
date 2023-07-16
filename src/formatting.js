import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
  nested: ' ',
};

const createIndent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, value1]) => `${createIndent(depth + 1)}${key}: ${stringify(value1, depth + 1)}`,
  );

  const result = ['{', ...entries, `${createIndent(depth)}}`];
  return result.join('\n');
};

const stylish = (value, depth = 1) => {
  switch (value.type) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${createIndent(depth)}${symbols[value.type]} ${
        value.key
      }: ${stringify(value.value, depth)}`;
    case 'changed':
      return `${createIndent(depth)}${symbols.deleted} ${
        value.key
      }: ${stringify(value.valueBefore, depth)}\n${createIndent(depth)}${
        symbols.added
      } ${value.key}: ${stringify(value.valueAfter, depth)}`;
    case 'nested':
      return `${createIndent(depth)}  ${value.key}: {\n${value.children
        .map((val) => stylish(val, depth + 1))
        .join('\n')}\n ${createIndent(depth)} }`;
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
};

const makeFinalView = (diff) => `{\n${diff.map((value) => stylish(value, 1)).join('\n')}\n}`;

export default makeFinalView;
