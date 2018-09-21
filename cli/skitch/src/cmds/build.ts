import * as shell from 'shelljs';
const parser = require('pgsql-parser');
import { readFileSync, writeFileSync } from 'fs';
import { prompt } from 'inquirerer';
import { dirname, basename, resolve } from 'path';
import { sync as glob } from 'glob';

import { skitchPath } from 'skitch-path';

export default async argv => {

  const native = [];
  const skitchPath = await skitchPath();

  const extensions = glob (skitchPath + '/**/*.control').reduce((m, v)=> {
    const contents = readFileSync(v).toString();
    const key = basename(v).split('.control')[0];
    m[key] = {};
    m[key] = {path: v};
    m[key].requires = contents
                      .split('\n')
                      .find(el=>/^requires/.test(el))
                      .split('=')[1]
                      .split(',').map(el=>
                        el
                          .replace(/[\'\s]*/g, '')
                          .trim()
                      );
    m[key].version = contents
                      .split('\n')
                      .find(el=>/^default_version/.test(el))
                      .split('=')[1]
                      .replace(/[\']*/g, '')
                      .trim()
                      ;
    m[key].sql = readFileSync(resolve(`${dirname(v)}/sql/${key}--${m[key].version}.sql`)).toString().split('\n').filter((l, i)=>i!==0).join('\n');
    return m;
  }, {});

  let deps = Object.keys(extensions).reduce((m, k) => {
    m[k] = extensions[k].requires;
    return m;
  }, {});

  // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
  function dep_resolve(
    sqlmodule: string,
    resolved: string[],
    unresolved: string[]
  ) {
    unresolved.push(sqlmodule);
    let edges = deps[sqlmodule];
    if (!edges) {
      native.push(sqlmodule);
      edges = deps[sqlmodule] = [];
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

  let resolved: string[] = [];
  let unresolved: string[] = [];


  const questions = [
    {
      _: true,
      type: 'list',
      name: 'dep',
      message: 'choose a dep',
      choices: Object.keys(extensions),
      required: true,
    },
    {
      _: true,
      name: 'path',
      message: 'choose a name',
      filter: (val) => {
        val = /.sql$/.test(val) ? val : val + '.sql';
        return resolve( skitchPath + '/' + val )
      },
      required: true,
    }
  ];

  let { dep, path } = await prompt(questions, argv);

  dep_resolve(dep, resolved, unresolved);

  let sql = [];


  resolved.forEach(extension=> {
      if (native.includes(extension)) {
        sql.push(`CREATE EXTENSION IF NOT EXISTS "${extension}" CASCADE;`);
      } else {
        sql.push(extensions[extension].sql);
      }
  });

  writeFileSync(path, sql.join('\n'));
};
