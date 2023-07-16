import _ from "lodash";

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

const makeStylish = (value, depth = 1) => {
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
        .map((val) => makeStylish(val, depth + 1))
        .join("\n")}\n ${createIndent(depth)} }`;
    default:
      throw new Error(`Unknown type: ${value.type}`);
  }
};

const makeFinalView = (diff) =>
  `{\n${diff.map((value) => makeStylish(value, 1)).join("\n")}\n}`;

export default makeFinalView;
