import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatting) => {
  switch (formatting) {
    case 'stylish': {
      return stylish(data);
    }
    case 'plain': {
      return plain(data);
    }
    case 'json': {
      return JSON.stringify(data);
    }
    default:
      throw new Error('This format doesn’t exist');
  }
};
