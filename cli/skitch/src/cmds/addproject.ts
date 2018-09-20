import { exec } from 'child_process';
import { prompt } from 'inquirerer';

const questions = [
  {
    type: 'string',
    name: 'project',
    message: 'enter a project name',
    required: true
  },
  {
    type: 'string',
    name: 'change',
    message: 'enter a change name',
    required: true
  }
];
export default async argv => {
  const { project, change } = await prompt(questions, argv);

  const name = ['projects', project, ...change.split('/')].join('/');
  const comment = `adding project ${project}`;

  const cmd = ['sqitch', 'add', name, '-r', `${project}:${change}`, '--n', `"${comment}"`].join(' ');
  console.log(cmd);
  const sqitch = exec(cmd.trim());
  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
