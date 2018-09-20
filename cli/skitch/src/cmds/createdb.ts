import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
import env from 'skitch-env';

const questions = [
  {
    _: true,
    name: 'db',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { db } = await prompt(questions, argv);
  shell.exec(`createdb ${db}`, {
    env
  });
};
