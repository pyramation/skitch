import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

const questions = [
  {
    name: 'dbname',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { dbname } = await prompt(questions, argv);
  shell.exec(`PGUSER=postgres PGHOST=localhost sqitch verify db:pg:${dbname}`);
};
