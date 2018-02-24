import * as shell from 'shelljs';
import { prompt } from 'skitch-prompt';

const questions = [
  {
    name: 'dbname',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { dbname } = await prompt(questions, argv);
  var sqitch = shell.exec(
    `PGUSER=postgres PGHOST=localhost sqitch verify db:pg:${dbname}`
  );
};
