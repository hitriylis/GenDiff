const formatValue = (value) => {
  if (value === null) return null;

  const status = typeof value;

  const statuses = {
    string: `'${value}'`,
    object: '[complex value]',
  };

  return statuses[status] || String(value);
};

const makePlain = (tree) => {
  const iter = (data, path) => data
    .map((node) => {
      const {
        key, value, oldValue, newValue, children, status,
      } = node;

      const accPath = !path ? `${key}` : `${path}.${key}`;

      switch (status) {
        case 'unupdated':
          return null;
        case 'added':
          return `Property '${accPath}' was ${status} with value: ${formatValue(value)}\n`;
        case 'removed':
          return `Property '${accPath}' was ${status}\n`;
        case 'updated': {
          const value1 = formatValue(oldValue);
          const value2 = formatValue(newValue);
          return `Property '${accPath}' was ${status}. From ${value1} to ${value2}\n`;
        }
        case 'nested':
          return iter(children, accPath);
        default:
          throw new Error(`Unknow type ${status}!`);
      }
    }).join('');
  return iter(tree, '').trim();
};

export default makePlain;
