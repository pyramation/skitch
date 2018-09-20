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
  {
    name: 'yes',
    type: 'confirm',
    message: 'are you sure?',
    required: true,
  },
];
export default async argv => {
  const { db, confirm } = await prompt(questions, argv);
  if (!confirm) return;
  shell.exec(`sqitch deploy db:pg:${db}`, {
    env
  });
};
