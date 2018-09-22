import * as shell from 'shelljs';
import { prompt } from 'inquirerer';
import { listModules, revert } from 'skitch-utils';

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
    name: 'database',
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
  const { database, yes, recursive } = await prompt(questions, argv);
  if (!yes) return;

  if (recursive) {
    const modules = await listModules();
    const { name } = await prompt([
      {
        type: 'list',
        name: 'name',
        message: 'choose a project',
        choices: Object.keys(modules),
        required: true,
      }
    ], {});
    await revert(name, database);
  } else {
    console.log(`sqitch revert db:pg:${database} -y`);
    shell.exec(`sqitch revert db:pg:${database} -y`, {
      env: {
        PGUSER,
        PGPASSWORD,
        PGHOST,
        PGPORT,
        PATH
      }
    });
  }

};
