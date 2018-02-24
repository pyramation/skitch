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
  shell.exec(`createdb -U postgres -h localhost ${dbname}`);
};
