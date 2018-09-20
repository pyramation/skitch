import { exec } from 'child_process';
import { prompt } from 'inquirerer';
import skitchPath from 'skitch-path';
import { basename } from 'path';
const promisify = require('util').promisify;
const fs = require('fs');
const glob = promisify(require('glob'));
const asyncExec = promisify(exec);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    default: basename(process.cwd()),
    required: true,
  },
];

export default async argv => {
  const PKGDIR = await skitchPath();

  let name = argv.name;
  if (!name) {
    try {
      name = JSON.parse(fs.readFileSync(`${PKGDIR}/package.json`).toString())
        .name;
    } catch (e) {}
    if (!name) {
      ({ name } = await prompt(questions, argv));
    }
  }

  // var moment = require('moment-timezone');
  // var now = moment()
  //   .tz('America/Los_Angeles')
  //   .format();
  //
  // now = now.replace(/-[0-9][0-9]:[0-9][0-9]$/, 'Z');
  // temp so we can actually see diffs in plan

  var now = '2017-08-11T08:11:51Z';

  var external = [];

  var planfile: string[] = [];

  var deps: { [type: string]: any } = {};
  var reg: { [type: string]: any } = {};

  const makeKey = (sqlmodule) =>
    '/deploy/' + sqlmodule + '.sql';

  // TODO make a class that uses paths instead of some.sql

  // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
  function dep_resolve(
    sqlmodule: string,
    resolved: string[],
    unresolved: string[]
  ) {
    unresolved.push(sqlmodule);
    let edges = deps[makeKey(sqlmodule)];
    if (!edges) {
      if (/:/.test(sqlmodule)) {
        external.push(sqlmodule);
        edges = deps[sqlmodule] = [];
      } else {
        throw new Error(`no module ${sqlmodule}`);
      }

    }
    try {
      console.log('edges');
      console.log(edges);

    for (var i = 0; i < edges.length; i++) {
      console.log('edges[i]');
      console.log(edges[i]);
      var dep = edges[i];
      if (!resolved.includes(dep)) {
        if (unresolved.includes(dep)) {
          throw new Error(`Circular reference detected ${sqlmodule}, ${dep}`);
        }
        dep_resolve(dep, resolved, unresolved);
      }
    }
  } catch (e) {
    console.error(e);
  }
    resolved.push(sqlmodule);
    var index = unresolved.indexOf(sqlmodule);
    unresolved.splice(index);
  }

  var files = await glob(`${PKGDIR}/deploy/**/**.sql`);
  console.log('files');
  console.log(files);
  for (var i = 0; i < files.length; i++) {
    console.log('files[i]');
    console.log(files[i]);
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
        if (key != makeKey(m2[1])) {
          throw new Error(
            'deployment script in wrong place or is named wrong internally' + m2
          );
        }
        reg[key].push(m2[1]);
      }
    }
  }

  planfile.push(`%syntax-version=1.0.0
  %project=${name}
  %uri=${name}

  `);

  let resolved: string[] = [];
  var unresolved: string[] = [];

  deps = Object.assign(
    {
      [makeKey('apps/index')]: Object.keys(deps)
        .filter(dep => dep.match(/^\/deploy\//))
        .map(dep => dep.replace(/^\/deploy\//, '').replace(/.sql$/, '')),
    },
    deps
  );

  dep_resolve('apps/index', resolved, unresolved);
  var index = resolved.indexOf('apps/index');
  resolved.splice(index);

  // move extensions up
  const extensions = resolved.filter(a=>a.match(/^extensions/));
  const normalSql = resolved.filter(a=>!a.match(/^extensions/));

  // resolved = useExtensions ? [...extensions, ...normalSql] : [...normalSql];
  resolved = [...extensions, ...normalSql]
  // resolved = [...normalSql];

  resolved.forEach(res => {
    if (/:/.test(res)) return;
    if (deps[makeKey(res)] && deps[makeKey(res)].length) {
      planfile.push(
        `${res} [${deps[makeKey(res)].join(
          ' '
        )}] ${now} skitch <skitch@5b0c196eeb62> # add ${res}`
      );
    } else {
      planfile.push(`${res} ${now} skitch <skitch@5b0c196eeb62> # add ${res}`);
    }
  });

  fs.writeFileSync(`${PKGDIR}/sqitch.plan`, planfile.join('\n'));
};
