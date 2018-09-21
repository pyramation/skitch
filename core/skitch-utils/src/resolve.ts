import { promisify } from 'util';
const fs = require('fs');
const glob = require('glob');
const readFile = promisify(fs.readFile);
const asyncGlob = promisify(glob);

import { getDeps } from './deps';

export interface ObjHash {
  [key: string]: string[];
}

export const resolve = async (pkgDir = process.cwd(), scriptType = 'deploy'): Promise<string> => {
  let sqlfile: string[] = [];

  let { resolved, external } = await getDeps(pkgDir);

  if (scriptType === 'revert') {
    resolved = resolved.reverse();
  }

  for (var i=0; i<resolved.length; i++) {
    if (external.includes(resolved[i])) continue;
    const file = `${pkgDir}/${scriptType}/${resolved[i]}.sql`
    const modName = file.split(`/${scriptType}/`)[1];
    const dscript = fs.readFileSync(file).toString();
    sqlfile.push(dscript);
  }

  return sqlfile.join('\n');
};
