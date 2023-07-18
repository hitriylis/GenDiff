import yaml from 'js-yaml';

const getFileParse = (fileData, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(fileData);
    case 'yaml':
      return yaml.load(fileData);
    case 'yml':
      return yaml.load(fileData);
    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};

export default getFileParse;
