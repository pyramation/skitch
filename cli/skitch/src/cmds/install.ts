import { prompt } from 'inquirerer';
// import {
//   sqitchPath as sqPath,
//   skitchPath as skPath
// } from 'skitch-utils';
//
// import * as shell from 'shelljs';
// import plan from './plan';
// import { resolve } from 'path';
// import { sync as glob } from 'glob';

const questions = [
  {
    _: true,
    name: 'moduleinfo',
    message: 'modulename@version',
    filter: (val) =>
      /@/.test(val) ? val.split('@') : [val, 'latest'],
    required: true,
  },

];

export default async argv => {

  console.log(argv);

  // "skitch install"
  if (Object.keys(argv).length===1&&!argv._.length) {
    return console.log('should so a npm install on all the packages here!');
  } else
  if (Object.keys(argv).length===2&&!argv._.length && argv.cmd==='install') {
    return console.log('should so a npm install on all the packages here!');
  }

  // "skitch module@version"
  const { moduleinfo, } = await prompt(questions, argv);

};
