import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export default (filepath) => readFileSync(resolve(cwd(), filepath), 'utf8');
