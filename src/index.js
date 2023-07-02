import fs from "fs";

// Выполнить проверку, что оба сравниваемых файла имеют расширение JSON
// Открыть файлы и прочитать их
// Распарсить JSON
// Сравнить ключи и их значения у объектов из файлов
// Реализовать вывод.

const createIndent = (depth) => "  ".repeat(depth * spacesCount);

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

const genDifference = (fileName1, fileName2) => {
  return;
};

export default genDifference;
