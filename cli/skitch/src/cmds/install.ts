import { prompt } from 'inquirerer';
import path from 'skitch-path';
import * as shell from 'shelljs';
import plan from './plan';

const questions = [
  {
    name: 'modulename',
    message: 'module name',
    required: true,
  },
];

export default async argv => {
  const { modulename } = await prompt(questions, argv);
  shell.exec(`yarn add ${modulename}`);
  const skitchPath = await path();
  const files = `${skitchPath}/node_modules/${modulename}/src/*`;
  shell.cp('-r', files, `${skitchPath}/`);
  await plan({});
};
