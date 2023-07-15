import _ from 'lodash';

const addReplacer = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const getString = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const str = Object
    .entries(data)
    .map(([key, value]) => `${addReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${str.join('\n')}\n${addReplacer(depth - 1)}  }`;
};

const makeStylish = (tree) => {
  const iter = (obj, depth) => obj.map((node) => {
    const {
      key, value, newValue, oldValue, children, status,
    } = node;

    switch (status) {
      case 'added':
        return `${addReplacer(depth)}+ ${key}: ${getString(value, depth + 1)}`;
      case 'removed':
        return `${addReplacer(depth)}- ${key}: ${getString(value, depth + 1)}`;
      case 'unupdated':
        return `${addReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`;
      case 'updated': {
        const str1 = `${addReplacer(depth)}- ${key}: ${getString(oldValue, depth + 1)}`;
        const str2 = `${addReplacer(depth)}+ ${key}: ${getString(newValue, depth + 1)}`;
        return `${str1}\n${str2}`;
      }
      case 'nested':
        return `${addReplacer(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${addReplacer(depth)}  }`;
      default:
        throw new Error(`Unknow ${status}!`);
    }
  }).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};

export default makeStylish;
