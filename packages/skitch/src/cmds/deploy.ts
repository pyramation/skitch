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
  shell.exec(`dropdb -U postgres -h localhost ${dbname}`);
  shell.exec(`createdb -U postgres -h localhost ${dbname}`);
  var sqitch = shell.exec(
    `PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:${dbname}`,
    { async: true }
  );

  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
