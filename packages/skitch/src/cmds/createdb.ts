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
  var sqitch = shell.exec(`createdb -U postgres -h localhost ${dbname}`, {
    async: true,
  });

  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
