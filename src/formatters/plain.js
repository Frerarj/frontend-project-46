import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const makePlain = (value, parent = '') => {
  switch (value.type) {
    case 'added':
      return `Property '${parent}${value.key}' was added with value: ${stringify(value.value)}`;
    case 'deleted':
      return `Property '${parent}${value.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${value.key}' was updated. From ${stringify(value.valueBefore)} to ${stringify(value.valueAfter)}`;
    case 'nested':
      return value.children.map((val) => makePlain(val, `${parent + value.key}.`))
        .filter((item) => item !== null).join('\n');
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
};

const makeFinalView = (plain) => `${plain.map((element) => makePlain(element)).filter((item) => item !== null).join('\n')}`;

export default makeFinalView;
