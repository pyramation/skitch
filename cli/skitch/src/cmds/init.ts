import 'skitch-template';
import { promisify } from 'util';
import { exec } from 'child_process';
import { prompt } from 'inquirerer';
import path from 'skitch-path';
import { dirname, basename } from 'path';
import * as shell from 'shelljs';
import { writeFileSync } from 'fs';
const srcPath = dirname(require.resolve('skitch-template'));

import plan from './plan';

// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg
const username = shell
  .exec('git config --global user.name', { silent: true })
  .trim();
const email = shell
  .exec('git config --global user.email', { silent: true })
  .trim();

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    default: basename(process.cwd()),
    required: true,
  },
  {
    name: 'author',
    message: 'project author',
    default: `${username} <${email}>`,
    required: true,
  },
  {
    name: 'description',
    message: 'project description',
    default: 'skitch project',
    required: true,
  },
];

const makePackage = ({ name, description, author }) => {
  return {
    name,
    version: '0.0.1',
    description,
    author,
    private: true,
  };
};

export default async argv => {
  const { name, description, author } = await prompt(questions, argv);
  const cmd = ['sqitch', 'init', name, '--engine', 'pg'].join(' ');
  await promisify(exec)(cmd.trim());
  const skitchPath = await path();
  const pkg = makePackage({ name, description, author });
  shell.cp('-r', `${srcPath}/src/*`, `${skitchPath}/`);
  writeFileSync(`${skitchPath}/package.json`, JSON.stringify(pkg, null, 2));
  await plan({ name });
};
