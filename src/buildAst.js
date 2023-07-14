import _ from 'lodash';

const makeAst = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union([...keys1], [...keys2]));

  const ast = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: makeAst(obj1[key], obj2[key]), status: 'nested' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  });

  return ast;
};

export default makeAst;
