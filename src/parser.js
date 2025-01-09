import yaml from 'js-yaml';

function parseToJson(file, extension) {
  if (extension === ('.yml' || '.yaml')) {
    return yaml.load(file);
  }

  return JSON.parse(file);
}

export default parseToJson;
