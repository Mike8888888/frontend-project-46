import yaml from 'js-yaml';

function parseToJson(file, extension) {
  switch (extension) {
    case '.yml' || '.yaml':
      return yaml.load(file);
    default:
      return JSON.parse(file);
  }
}

export default parseToJson;
