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
];
export default async argv => {
  const { db } = await prompt(questions, argv);
  shell.exec(`dropdb ${db}`, {
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT
    }
  });
};
