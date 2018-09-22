import {  writeFileSync } from 'fs';
import { prompt } from 'inquirerer';
import { resolve } from 'path';
import { skitchPath as sPath, listModules, build } from 'skitch-utils';

export default async argv => {
  const native = [];
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

  writeFileSync(path, sql.join('\n'));
};
