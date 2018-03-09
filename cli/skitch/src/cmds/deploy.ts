import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

const questions = [
  {
    _: true,
    name: 'db',
    message: 'database',
    required: true,
  },
  {
    name: 'confirm',
    type: 'confirm',
    message: 'are you sure?',
    required: true,
  },
];
export default async argv => {
  const { db, confirm } = await prompt(questions, argv);
  if (!confirm) return;
  shell.exec(`PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:${db}`);
};
