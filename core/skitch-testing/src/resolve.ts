/// <reference path="../../types/glob.d.ts"/>
import * as fs from 'fs';
import { promisify } from 'util';
import * as glob from 'glob';

const readFile = promisify(fs.readFile);
const asyncGlob = promisify(glob);

export interface ObjHash {
  [key: string]: string[];
}

export const resolve = async (pkgDir = process.cwd()): Promise<string> => {
  let sqlfile: string[] = [];

  let deps: ObjHash = {};

  // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
  function dep_resolve(
    sqlmodule: string,
    resolved: string[],
    unresolved: string[]
  ) {
    unresolved.push(sqlmodule);
    const edges = deps['/deploy/' + sqlmodule + '.sql'];
    if (!edges) {
      throw new Error(`no module ${sqlmodule}`);
    }
    for (let i = 0; i < edges.length; i++) {
      let dep = edges[i];
      if (!resolved.includes(dep)) {
        if (unresolved.includes(dep)) {
          throw new Error(`Circular reference detected ${sqlmodule}, ${dep}`);
        }
        dep_resolve(dep, resolved, unresolved);
      }
    }
    resolved.push(sqlmodule);
    let index = unresolved.indexOf(sqlmodule);
    unresolved.splice(index);
  }

  let files = await asyncGlob(pkgDir + '/deploy/**/**.sql');
  for (let i = 0; i < files.length; i++) {
    const data = await readFile(files[i]);

    let lines = data.toString().split('\n');
    const key = files[i].split(pkgDir)[1];
    deps[key] = [];

    for (let j = 0; j < lines.length; j++) {
      let m = lines[j].match(/-- requires: (.*)/);
      if (m) {
        deps[key].push(m[1].trim());
      }

      // check only:
      let m2 = lines[j].match(/-- Deploy (.*) to pg/);
      if (m2) {
        if (key !== `/deploy/${m2[1]}.sql`) {
          throw new Error(
            'deployment script in wrong place or is named wrong internally'
          );
        }
      }
    }
  }

  let resolved: string[] = [];
  let unresolved: string[] = [];

  // add one new dep, "the app index"
  // which has a dependancy of every module! (kinda a hack)
  deps = Object.assign(
    {
      '/deploy/apps/index.sql': Object.keys(deps)
        .filter(dep => dep.match(/^\/deploy\//))
        .map(dep => dep.replace(/^\/deploy\//, '').replace(/.sql$/, '')),
    },
    deps
  );

  dep_resolve('apps/index', resolved, unresolved);

  let index = resolved.indexOf('apps/index');
  resolved.splice(index);

  let cfiles = resolved.map(file => pkgDir + '/deploy/' + file + '.sql');
  let runners = [];
  cfiles.forEach(p => {
    let modName = p.split('/deploy/')[1];
    let dscript = fs.readFileSync(p).toString();
    sqlfile.push(dscript);
  });

  // TODO use streams
  return sqlfile.join('\n');
};
