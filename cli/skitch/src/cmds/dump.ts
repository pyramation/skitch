import {
  build,
  listModules,
  packageModule,
  skitchPath as sPath,
  sqitchPath as path,
  writePackage
} from 'skitch-utils';

import { resolve } from 'path';

import { prompt } from 'inquirerer';

import { writeFileSync } from 'fs';

const single = async argv => {
  const sqitchPath = await path();
  const pkgPath = `${sqitchPath}/package.json`;
  const pkg = require(pkgPath);

  const questions = [
    {
      name: 'version',
      message: 'version',
      default: pkg.version,
      required: true
    }
  ];

  const { version } = await prompt(questions, argv);
  await writePackage(version, false);
};

const all = async argv => {
  const skitchPath = await sPath();
  const modules = await listModules();

  const questions = [
    {
      _: true,
      type: 'list',
      name: 'project',
      message: 'choose a project',
      choices: Object.keys(modules),
      required: true
    },
    {
      _: true,
      name: 'path',
      message: 'choose a name',
      filter: val => {
        val = /.sql$/.test(val) ? val : val + '.sql';
        return resolve(skitchPath + '/' + val);
      },
      required: true
    }
  ];

  let { project, path } = await prompt(questions, argv);

  let sql = await build(project);

  writeFileSync(path, sql);
};

export default async argv => {
  const questions = [
    {
      type: 'confirm',
      name: 'deps',
      message: 'dump all dependencies too?',
      required: true
    }
  ];

  let { deps } = await prompt(questions, argv);
  if (deps) {
    await single(argv);
  } else {
    await all(argv);
  }
};
