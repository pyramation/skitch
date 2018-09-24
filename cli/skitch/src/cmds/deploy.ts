import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
import { listModules, deploy } from 'skitch-utils';

import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PATH } from 'skitch-env';

const questions = [
  {
    _: true,
    name: 'database',
    message: 'database',
    required: true
  },
  {
    name: 'createdb',
    type: 'confirm',
    message: 'createdb?',
    required: true
  },
  {
    name: 'yes',
    type: 'confirm',
    message: 'are you sure?',
    required: true
  }
];

const exec = cmd =>
  shell.exec(cmd, {
    env: {
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGPORT,
      PATH
    }
  });

export default async argv => {
  let { database, yes, recursive } = await prompt(questions, argv);
  if (!yes) return;

  if (argv.createdb) {
    database = 'db-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(`createdb ${database}`);
    exec(`createdb ${database}`);
  }
  if (recursive) {
    const modules = await listModules();
    const { name } = await prompt(
      [
        {
          type: 'list',
          name: 'name',
          message: 'choose a project',
          choices: Object.keys(modules),
          required: true
        }
      ],
      {}
    );
    await deploy(name, database);
  } else {
    console.log(`sqitch deploy db:pg:${database}`);
    exec(`sqitch deploy db:pg:${database}`);
  }
};
