import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatTree = (tree, format) => {
  const formatters = {
    plain: makePlain(tree),
    json: JSON.stringify(tree),
    stylish: makeStylish(tree),
  };
  return !formatters[format] ? new Error(`Unknow format: ${format}!`) : formatters[format];
};

export default formatTree;
