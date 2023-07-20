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
    ([key, value1]) => `${createIndent(depth + 1)}  ${key}: ${stringify(value1, depth + 1)}`,
  );

  const result = ['{', ...entries, `  ${createIndent(depth)}}`];
  return result.join('\n');
};

const makeStylish = (value, depth = 1) => {
  const indent = createIndent(depth);
  const valueBefore = stringify(value.valueBefore, depth);
  const valueAfter = stringify(value.valueAfter, depth);

  switch (value.type) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${indent}${symbols[value.type]} ${value.key}: ${stringify(value.value, depth)}`;
    case 'changed':
      return `${indent}${symbols.deleted} ${value.key}: ${valueBefore}\n${indent}${symbols.added} ${value.key}: ${valueAfter}`;
    case 'nested':
      return `${indent}  ${value.key}: {\n${value.children.map((val) => makeStylish(val, depth + 1)).join('\n')}\n ${indent} }`;
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
};

const makeFinalView = (diff) => `{\n${diff.map((value) => makeStylish(value, 1)).join('\n')}\n}`;

export default makeFinalView;
