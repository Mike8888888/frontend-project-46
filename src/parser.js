import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

function parseToJson(filepath) {
  if (filepath.endsWith('.yml' && '.yaml')) {
    return yaml.load(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8'));
  }

  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8'));
}

export default parseToJson;
