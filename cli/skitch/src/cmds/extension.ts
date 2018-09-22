import 'skitch-template';
import { promisify } from 'util';
import { sync as mkdirp } from 'mkdirp';
import { exec } from 'child_process';
import { prompt } from 'inquirerer';
import { sync as glob } from 'glob';
import { sqitchPath as path } from 'skitch-utils';
import { dirname, basename, resolve } from 'path';
import * as shell from 'shelljs';
import { writeFileSync, readFileSync } from 'fs';

import plan from './plan';

export default async argv => {
  const sqitchPath = await path();

  const controlFile = glob(`${sqitchPath}/*.control`);
  const envFile = glob(`${sqitchPath}/.env`);
  if (!controlFile || !controlFile.length) {
    throw new Error('no control file found!');
  }
  if (!envFile || !envFile.length) {
    throw new Error('no control file found!');
  }

  let extensions;
  try {
    extensions = readFileSync(controlFile[0])
      .toString()
      .split('\n')
      .find(line => line.match(/^requires/))
      .split('=')[1]
      .split('\'')[1]
      .split(',')
      .map(a => a.trim());
  } catch (e) {
    throw new Error('missing requires from control files or bad syntax');
  }

  let envs;
  try {
    envs = readFileSync(envFile[0])
      .toString()
      .split('\n')
      .reduce((m, line) => {
        line = (line || '').trim();
        if (/^#/.test(line)) return m;
        if (!line.length) return m;
        const parts = line.split('=');
        m[parts[0].trim()] = parts[1].trim();
        return m;
      }, {});
  } catch (e) {
    throw new Error('missing env files or bad syntax');
  }

  if (projects) {
    envs.PGEXTENSIONS = extensions.join(',');
    writeFileSync(
      envFile[0],
      Object.keys(envs).reduce((m, key) => {
        const value = envs[key];
        m = `${m}\n${key}=${value}`;
        return m;
      }, '')
    );
  }

};
