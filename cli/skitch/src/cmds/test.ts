import * as shell from 'shelljs';
import {execSync} from 'child_process';
import { prompt } from 'inquirerer';
import {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PATH
} from 'skitch-env';

export default async argv => {
  const env = {
    PGUSER,
    PGPASSWORD,
    PGHOST,
    PGPORT,
    PATH
  };
  const db = 'test-db-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  shell.exec(`createdb ${db}`, {
    env
  });

  shell.exec(`sqitch deploy db:pg:${db}`, {
    env
  });

  if (argv.verify) {
    shell.exec(`sqitch verify db:pg:${db}`, {
      env
    });
  }
};
