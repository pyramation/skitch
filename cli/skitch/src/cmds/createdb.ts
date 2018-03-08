import * as shell from 'shelljs';
import { prompt } from 'inquirerer';

const questions = [
  {
    name: 'database',
    message: 'database',
    required: true,
  },
];
export default async argv => {
  const { database } = await prompt(questions, argv);
  shell.exec(`createdb -U postgres -h localhost ${database}`);
};
