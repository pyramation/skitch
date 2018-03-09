import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

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
  shell.exec(`createdb -U postgres -h localhost ${db}`);
};
