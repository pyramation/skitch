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
  shell.exec(`dropdb -U postgres -h localhost ${database}`);
  shell.exec(`createdb -U postgres -h localhost ${database}`);
  var sqitch = shell.exec(
    `PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:${database}`,
    { async: true }
  );

  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
