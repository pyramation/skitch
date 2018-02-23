import { exec } from 'child_process';
import { prompt } from 'skitch-prompt';
import path from 'skitch-path';
import { dirname } from 'path';
import libs from 'skitch-install';
const srcPath = dirname(require.resolve('skitch-install')) + '/src';
console.log(srcPath);

import * as shell from 'shelljs';

const questions = [
  {
    name: 'name',
    message: 'module name (e.g. plv8)',
    required: true,
  },
];
export default async argv => {
  const skitchPath = await path();
  console.log('-r', `${srcPath}/deploy/*`, `${skitchPath}/deploy`);
  shell.cp('-r', `${srcPath}/deploy/*`, `${skitchPath}/deploy`);
  shell.cp('-r', `${srcPath}/revert/*`, `${skitchPath}/revert`);
  shell.cp('-r', `${srcPath}/verify/*`, `${skitchPath}/verify`);
};
