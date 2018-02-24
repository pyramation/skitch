import * as shell from 'shelljs';
import { prompt } from 'skitch-prompt';

const questions = [
  {
    name: 'database',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { database } = await prompt(questions, argv);
  shell.exec(
    `PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:${database}`
  );
};
