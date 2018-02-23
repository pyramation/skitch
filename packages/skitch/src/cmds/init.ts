import 'skitch-install';
import { prompt } from 'skitch-prompt';
import { promisify } from 'util';
import { exec } from 'child_process';
import { prompt } from 'skitch-prompt';
import path from 'skitch-path';
import { dirname } from 'path';
import * as shell from 'shelljs';
const srcPath = dirname(require.resolve('skitch-install'));

import plan from './plan';

// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    required: true,
  },
];
export default async argv => {
  const { name } = await prompt(questions, argv);
  const cmd = ['sqitch', 'init', name, '--engine', 'pg'].join(' ');
  await promisify(exec)(cmd.trim());
  const skitchPath = await path();
  ['deploy', 'verify', 'revert'].forEach(p => {
    shell.cp('-r', `${srcPath}/src/${p}/*`, `${skitchPath}/src/${p}`);
  });
  shell.cp(`${srcPath}/docker-compose.yml`, `${skitchPath}/docker-compose.yml`);
  shell.cp(`${srcPath}/sqitch.md`, `${skitchPath}/sqitch.md`);
  await plan({ name });
};
