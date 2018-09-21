import { readFileSync, readFile } from 'fs';
import { basename, dirname, resolve, relative } from 'path';
import { sync as glob } from 'glob';
import { skitchPath } from './paths';
import { listModules } from './modules';
import { getDeps } from './deps';

export const makePlan = async (packageDir, name) => {
  var now = '2017-08-11T08:11:51Z';

  var planfile = [];
  var external = [];

  planfile.push(`%syntax-version=1.0.0
  %project=${name}
  %uri=${name}

  `);

  let { resolved, external, deps } = await getDeps(packageDir);
  const makeKey = sqlmodule => '/deploy/' + sqlmodule + '.sql';

  resolved.forEach(res => {
    // TODO allow for two plans
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

export const getPlan = async name => {
  const modules = await listModules();
  if (!modules[name]) {
    throw new Error(`${name} NOT FOUND!`);
  }
  const path = await skitchPath();
  const packageDir = `${path}/${modules[name].path}`;

  return await makePlan(packageDir, name);
};
