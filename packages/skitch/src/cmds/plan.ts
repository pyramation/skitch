import { exec } from 'child_process';
import { prompt } from 'skitch-prompt';
import skitchPath from 'skitch-path';
const promisify = require('util').promisify;
const fs = require('fs');
const glob = promisify(require('glob'));
const asyncExec = promisify(exec);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default async argv => {
  const PKGDIR = await skitchPath();

  // var moment = require('moment-timezone');
  // var now = moment()
  //   .tz('America/Los_Angeles')
  //   .format();
  //
  // now = now.replace(/-[0-9][0-9]:[0-9][0-9]$/, 'Z');
  // temp so we can actually see diffs in plan
  var now = '2017-08-11T08:11:51Z';

  var planfile = [];

  var deps = {};
  var reg = {};

  // TODO make a class that uses paths instead of some.sql

  // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
  function dep_resolve(sqlmodule, resolved, unresolved) {
    unresolved.push(sqlmodule);
    const edges = deps['/deploy/' + sqlmodule + '.sql'];
    if (!edges) {
      throw new Error(`no module ${sqlmodule}`);
    }
    for (var i = 0; i < edges.length; i++) {
      var dep = edges[i];
      if (!resolved.includes(dep)) {
        if (unresolved.includes(dep)) {
          throw new Error(`Circular reference detected ${sqlmodule}, ${dep}`);
        }
        dep_resolve(dep, resolved, unresolved);
      }
    }
    resolved.push(sqlmodule);
    var index = unresolved.indexOf(sqlmodule);
    unresolved.splice(index);
  }

  var files = await glob(`/${skitchPath}/deploy/**/**.sql`);

  for (var i = 0; i < files.length; i++) {
    const data = await readFile(files[i]);

    var lines = data.toString().split('\n');
    const key = files[i].split(PKGDIR)[1];
    deps[key] = [];
    reg[key] = [];

    for (var j = 0; j < lines.length; j++) {
      var m = lines[j].match(/-- requires: (.*)/);
      if (m) {
        deps[key].push(m[1].trim());
      }

      // check only:
      var m2 = lines[j].match(/-- Deploy (.*) to pg/);
      if (m2) {
        if (key != `/deploy/${m2[1]}.sql`) {
          throw new Error(
            'deployment script in wrong place or is named wrong internally' + m2
          );
        }
        reg[key].push(m2[1]);
      }
    }
  }

  planfile.push(`%syntax-version=1.0.0
  %project=proj
  %uri=https://github.com/projinc/proj-sql
  `);

  var resolved = [];
  var unresolved = [];

  deps = Object.assign(
    {
      '/deploy/apps/index.sql': Object.keys(deps)
        .filter(dep => dep.match(/^\/deploy\//))
        .map(dep => dep.replace(/^\/deploy\//, '').replace(/.sql$/, '')),
    },
    deps
  );

  dep_resolve('apps/index', resolved, unresolved);

  var index = resolved.indexOf('apps/index');
  resolved.splice(index);

  // procedures/verify_function 2017-08-08T22:22:30Z root <root@5b0c196eeb62> # verify_function

  resolved.forEach(res => {
    if (deps['/deploy/' + res + '.sql'].length) {
      planfile.push(
        `${res} [${deps['/deploy/' + res + '.sql'].join(
          ' '
        )}] ${now} root <root@5b0c196eeb62> # add ${res}`
      );
    } else {
      planfile.push(`${res} ${now} root <root@5b0c196eeb62> # add ${res}`);
    }
  });

  console.log(`
  --
  --      |||
  --     (o o)
  -- ooO--(_)--Ooo-
  --
  --
      `);

  fs.writeFileSync('plans/index.plan', planfile.join('\n'));
};
