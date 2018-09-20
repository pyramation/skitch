import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
import {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PATH
} from 'skitch-env';

const questions = [
  {
    _: true,
    name: 'db',
    message: 'database',
    required: true,
  },
  {
    name: 'yes',
    type: 'confirm',
    message: 'are you sure?',
    required: true,
  },
];
export default async argv => {
  const { db, yes } = await prompt(questions, argv);
  if (!yes) return;
  console.log(`sqitch deploy db:pg:${db}`);
  shell.exec(`sqitch deploy db:pg:${db}`, {
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT,
      PATH
    }
  });
};
