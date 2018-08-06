import * as shell from 'shelljs';
// TODO move resolve to skitch-utils
import { resolve } from 'skitch-testing';
import { prompt } from 'inquirerer';
import { writeFileSync } from 'fs';

const questions = [
  {
    name: 'name',
    message: 'extension name',
    required: true,
  },
  {
    name: 'version',
    message: 'extension version',
    required: true,
  },
];
export default async argv => {
  const { name, version } = await prompt(questions, argv);
  const sql = await resolve();
  writeFileSync(`${process.cwd()}/${name}--${version}.sql`, sql);
};
