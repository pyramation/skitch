import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

const questions = [
  {
    name: 'db',
    message: 'database',
    required: true,
  },
  {
    name: 'confirm',
    message: 'are you sure?',
    required: true,
  },
];
export default async argv => {
  const { db, confirm } = await prompt(questions, argv);
  if (!confirm) return;
  var sqitch = shell.exec(
    `PGUSER=postgres PGHOST=localhost sqitch revert db:pg:${db} -y`
  );
};
