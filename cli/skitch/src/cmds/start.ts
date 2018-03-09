import { InquirerQuestion } from 'skitch-types';
import { readdir } from 'fs';
import { resolve as resolvePath } from 'path';
import { promisify } from 'util';
import { prompt } from 'inquirerer';
import skitchPath from 'skitch-path';
import * as shell from 'shelljs';

export default async argv => {
  const path = await skitchPath();
  const questions: Array<InquirerQuestion> = [
    {
      name: 'db',
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
  const { schemas, db } = await prompt(questions, argv);
  const cmd = [
    'postgraphile',
    '--connection',
    `postgres://postgres:@localhost/${db}`,
    '--schema',
    schemas.join(','),
  ].join(' ');
  shell.exec(cmd);
};
