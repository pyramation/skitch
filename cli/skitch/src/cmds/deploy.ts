import { prompt } from 'inquirerer';
import { listModules, deploy, execSync, random } from 'skitch-utils';

const questions = [
  {
    _: true,
    name: 'database',
    message: 'database',
    required: true
  },
  {
    name: 'yes',
    type: 'confirm',
    message: 'are you sure?',
    required: true
  }
];

export default async argv => {
  let { database, yes, recursive, createdb } = await prompt(questions, argv);
  if (!yes) return;

  if (argv.createdb) {
    database = 'db-' + random();
    console.log(`createdb ${database}`);
    execSync(`createdb ${database}`);
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
    execSync(`sqitch deploy db:pg:${database}`);
  }
};
