import { exec } from 'child_process';
import { prompt } from 'skitch-prompt';
import path from 'skitch-path';
import { dirname } from 'path';
import libs from 'skitch-install';
import * as shell from 'shelljs';
const srcPath = dirname(require.resolve('skitch-install')) + '/src';
export default async argv => {
  const skitchPath = await path();
  ['deploy', 'verify', 'revert'].forEach(p => {
    shell.cp('-r', `${srcPath}/${p}/*`, `${skitchPath}/${p}`);
  });
};
