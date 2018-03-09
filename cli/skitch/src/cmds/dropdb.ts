import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

const questions = [
  {
    name: 'db',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { db } = await prompt(questions, argv);
  shell.exec(`dropdb -U postgres -h localhost ${db}`);
};
