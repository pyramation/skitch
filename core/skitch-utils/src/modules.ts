import { readFileSync, readFile } from 'fs';
import { basename, dirname, resolve, relative } from 'path';
import { sync as glob } from 'glob';
import { skitchPath } from './paths';

export const listModules = async () => {
  const path = await skitchPath();
  const extensions = glob (path + '/**/*.control').reduce((m, v)=> {
    const contents = readFileSync(v).toString();
    const key = basename(v).split('.control')[0];
    m[key] = {};
    m[key] = {path: dirname(relative(path, v))};
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
    return m;
  }, {});

  return extensions;
};

export const latestChange = async (sqlmodule) => {
  const modules = await listModules();
  if (!modules[sqlmodule]) {
    throw new Error(`${sqlmodule} NOT FOUND!`);
  }
  const path = await skitchPath();
  const plan = readFileSync(`${path}/${modules[sqlmodule].path}/sqitch.plan`).toString().split('\n').map(a=>a.trim()).filter(a=>a);
  return plan[plan.length-1].split(' ')[0];
};

export const getPlan = async (name) => {
  const modules = await listModules();
  if (!modules[name]) {
    throw new Error(`${name} NOT FOUND!`);
  }
  const path = await skitchPath();
  const PKGDIR = `${path}/${modules[name].path}`;

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

  var files = await glob(`${PKGDIR}/deploy/**/**.sql`);
  for (var i = 0; i < files.length; i++) {
    const data = readFileSync(files[i]);
    var lines = data.toString().split('\n');
    const key = '/' + relative(PKGDIR, files[i]);
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

  return planfile.join('\n');

};


export const getExtensionsAndModules = async (sqlmodule) => {
  const modules = await listModules();
  if (!modules[sqlmodule]) {
    throw new Error(`${sqlmodule} NOT FOUND!`);
  }
  const native = modules[sqlmodule].requires.filter(a=>!Object.keys(modules).includes(a));
  const sqitch = modules[sqlmodule].requires.filter(a=>Object.keys(modules).includes(a));;
  return {
    native, sqitch
  }
};
