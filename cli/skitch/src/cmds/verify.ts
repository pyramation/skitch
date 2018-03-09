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
  shell.exec(`PGUSER=postgres PGHOST=localhost sqitch verify db:pg:${db}`);
};
