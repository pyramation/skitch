import { InquirerQuestion } from 'skitch-types';
import { readdir } from 'fs';
import { resolve as resolvePath } from 'path';
import { promisify } from 'util';
import { prompt } from 'skitch-prompt';
import skitchPath from 'skitch-path';
import * as shell from 'shelljs';

export default async argv => {
  const path = await skitchPath();
  const questions: Array<InquirerQuestion> = [
    {
      name: 'database',
      message: 'database',
      required: true,
    },
    {
      type: 'checkbox',
      name: 'schemas',
      message: 'choose schemas',
      choices: await promisify(readdir)(resolvePath(path + '/deploy/schemas')),
      required: true,
    },
  ];
  const { schemas, database } = await prompt(questions, argv);
  const cmd = [
    'postgraphile',
    '--connection',
    `postgres://postgres:@localhost/${database}`,
    '--schema',
    schemas.join(','),
  ].join(' ');
  shell.exec(cmd);
};
