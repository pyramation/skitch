import skitchPath from 'skitch-path';
import { prompt } from 'inquirerer';
const mkdirp = require('mkdirp').sync;

// sqitch add appschema -n 'Add schema for all flipr objects.'

const questions = [
  {
    name: 'name',
    message: 'test name',
    required: true,
  },
];
export default async argv => {
  // const PKGDIR = await skitchPath();
  let { name } = await prompt(questions, argv);

  console.log(name);
  // console.log(PKGDIR);

  // const { name, comment } = await prompt(questions, argv);
  // const cmd = ['sqitch', 'add', name, '--n', comment].join(' ');
  // const sqitch = exec(cmd.trim());
  // sqitch.stdout.pipe(process.stdout);
  // sqitch.stderr.pipe(process.stderr);
};
