import { prompt } from 'inquirerer';
import {
  sqitchPath as sqPath,
  skitchPath as skPath
} from 'skitch-utils';

import * as shell from 'shelljs';
import plan from './plan';
import { resolve } from 'path';
import { sync as glob } from 'glob';

const questions = [
  {
    _: true,
    name: 'modulename',
    message: 'module name',
    required: true,
  },
  {
    type: 'list',
    name: 'type',
    message: 'choose a module',
    choices: ['github', 'local', 'yarn'],
    required: true
  }

];

export default async argv => {
  const { modulename, type } = await prompt(questions, argv);
  console.log(argv);

  switch (type) {
    case 'pgxn': {

    }
    case 'npm':
    case 'yarn': {

      // shell.exec(`yarn add ${modulename}`);
      // const sqitchPath = await sqPath();
      // const files = `${sqitchPath}/node_modules/${modulename}/src/*`;
      // shell.cp('-r', files, `${sqitchPath}/`);
      // await plan({});
      // return;
    }
    case 'local': {
      const results = await prompt([
        {
          name: 'where',
          message: 'where at? (e.g. ../my-module)',
          filter: (val) => {
            return resolve(process.cwd() + '/' + val)
          },
          required: true,
        }
      ], argv);
      console.log(results);
      console.log(glob(results.where + '/**/sqitch.plan'))

      return;
    }
    default:
      console.log('not implemented');
  }

};
