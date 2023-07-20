import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) !== 'string') {
    return `${value}`;
  }
  return `'${value}'`;
};

const makePlain = (tree) => {
  const iter = (data, path) => data
    .map((node) => {
      const {
        key, value, oldValue, newValue, children, status,
      } = node;

      const property = !path ? `${key}` : `${path}.${key}`;

      switch (status) {
        case 'unupdated':
          return null;
        case 'added':
          return `Property '${property}' was ${status} with value: ${formatValue(value)}\n`;
        case 'removed':
          return `Property '${property}' was ${status}\n`;
        case 'updated': {
          const value1 = formatValue(oldValue);
          const value2 = formatValue(newValue);
          return `Property '${property}' was ${status}. From ${value1} to ${value2}\n`;
        }
        case 'nested':
          return iter(children, property);
        default:
          throw new Error(`Unknow type ${status}!`);
      }
    }).join('');
  return iter(tree, '').trim();
};

export default makePlain;
