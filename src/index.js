import fs from "fs";
import path from "path";
import _ from "lodash";

// Файлы
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) =>
  fs.readFileSync(getAbsolutePath(filepath), "utf-8");

const symbols = {
  added: "+",
  deleted: "-",
  unchanged: " ",
  nested: " ",
};

const createIndent = (depth) => "  ".repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, value]) =>
      `${createIndent(depth + 1)}${key}: ${iter(value, depth + 1)}`
  );

  const result = [`{`, ...entries, `${createIndent(depth)}}`];
  return result.join("\n");
};

const getStylishFormat = (value, depth = 1) => {
  switch (value.type) {
    case "added":
    case "deleted":
    case "unchanged":
      return `${createIndent(depth)}${symbols[value.type]} ${
        value.key
      }: ${stringify(value.value, depth)}`;
    case "changed":
      return `${createIndent(depth)}${symbols.deleted} ${
        value.key
      }: ${stringify(value.valueBefore, depth)}\n${createIndent(depth)}${
        symbols.added
      } ${value.key}: ${stringify(value.valueAfter, depth)}`;
    case "nested":
      return `${createIndent(depth)}  ${value.key}: {\n${value.children
        .map((val) => getStylishFormat(val, depth + 1))
        .join("\n")}\n ${createIndent(depth)} }`;
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
};

const final = (diff) =>
  `{\n${diff.map((value) => getStylishFormat(value, 1)).join("\n")}\n}`;

const compareData = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        type: "added",
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: "deleted",
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: "nested",
        children: compareData(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        valueBefore: obj1[key],
        valueAfter: obj2[key],
        type: "changed",
      };
    }
    return {
      key,
      value: obj1[key],
      type: "unchanged",
    };
  });
  return result;
};

const genDiff = (file1, file2) => {
  const content1 = readFile(file1);
  const content2 = readFile(file2);
  const data1 = JSON.parse(content1);
  const data2 = JSON.parse(content2);
  const tree = compareData(data1, data2);

  return final(tree);
};

export default genDiff;
