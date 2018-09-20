import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
import {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
} from 'skitch-env';

const questions = [
  {
    _: true,
    name: 'db',
    message: 'database',
    required: true,
  },
  {
    name: 'confirm',
    type: 'confirm',
    message: 'are you sure?',
    required: true,
  },
];
export default async argv => {
  const { db, confirm } = await prompt(questions, argv);
  if (!confirm) return;
  shell.exec(`sqitch revert db:pg:${db} -y`, {
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT
    }
  });
};
