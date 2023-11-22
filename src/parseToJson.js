import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function parseToJson(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8'));
}

export default parseToJson;
