import 'skitch-install';
import { prompt } from 'skitch-prompt';
import { promisify } from 'util';
import { exec } from 'child_process';
import { prompt } from 'skitch-prompt';
import path from 'skitch-path';
import { dirname } from 'path';
import * as shell from 'shelljs';
const srcPath = dirname(require.resolve('skitch-install')) + '/src';

import plan from './plan';

// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    required: true,
  },
  {
    name: 'uri',
    message: 'project url (e.g., https://github.com/theory/sqitch-intro)',
    required: true,
  },
];
export default async argv => {
  const { name, uri } = await prompt(questions, argv);
  const cmd = ['sqitch', 'init', name, '--uri', uri, '--engine', 'pg'].join(
    ' '
  );
  await promisify(exec)(cmd.trim());
  const skitchPath = await path();
  ['deploy', 'verify', 'revert'].forEach(p => {
    shell.cp('-r', `${srcPath}/${p}/*`, `${skitchPath}/${p}`);
  });
  await plan({ name, uri });
};
