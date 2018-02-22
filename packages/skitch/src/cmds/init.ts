import { exec } from 'child_process';
import { prompt } from '../utils/inquirer';

// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg

const questions = [
  {
    name: 'name',
    message: 'project name (e.g., flipr)',
    required: true,
  },
  {
    name: 'uri',
    message: 'project url (e.g., https://github.com/theory/sqitch-intro)',
    required: true,
  },
];
export const init = async argv => {
  const { name, uri } = await prompt(questions, argv);
  const cmd = ['sqitch', 'init', name, '--uri', uri, '--engine', 'pg'].join(
    ' '
  );
  const sqitch = exec(cmd.trim());
  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
