import _ from 'lodash';

const addReplacer = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const string = Object
    .entries(data)
    .map(([key, value]) => `${addReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${string.join('\n')}\n${addReplacer(depth - 1)}  }`;
};

const makeStylish = (ast) => {
  const iter = (obj, depth = 1) => {
    const str = obj.map((node) => {
      const { key, value, status } = node;
      switch (status) {
        case 'added':
          return `${addReplacer(depth)}+ ${key}: ${getString(value, depth + 1)}`;
        case 'deleted':
          return `${addReplacer(depth)}- ${key}: ${getString(value, depth + 1)}`;
        case 'changed':
          return `${addReplacer(depth)}- ${key}: ${getString(node.oldValue, depth + 1)}\n${addReplacer(depth)}+ ${key}: ${getString(node.newValue, depth + 1)}`;
        case 'unchanged':
          return `${addReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`;
        case 'nested':
          return `${addReplacer(depth)}  ${key}: {\n${iter(value, depth + 1)}\n${addReplacer(depth)}  }`;
        default:
          throw new Error(`Unknow ${status}!`);
      }
    });

    return str.join('\n');
  };

  return `{\n${iter(ast)}\n}`;
};

export default makeStylish;
