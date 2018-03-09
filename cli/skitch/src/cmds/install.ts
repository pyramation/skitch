import { prompt } from 'inquirerer';
import path from 'skitch-path';
import { dirname, basename } from 'path';
import * as shell from 'shelljs';
import { writeFileSync } from 'fs';

import plan from './plan';

const questions = [
  {
    name: 'modulename',
    message: 'module name',
    required: true,
  },
];

export default async argv => {
  const { modulename } = await prompt(questions, argv);
  const cmd = ['npm', 'install'].join(' ');
  shell.exec(`npm install ${modulename}`);
  const skitchPath = await path();
  const result = require.resolve(modulename);
  console.log(result);
  // shell.cp('-r', `${srcPath}/src/*`, `${skitchPath}/`);
  // writeFileSync(`${skitchPath}/package.json`, JSON.stringify(pkg, null, 2));
  // await plan({ name });
};
