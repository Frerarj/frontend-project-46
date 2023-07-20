import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`${format} is not supported for now`);
  }
};
