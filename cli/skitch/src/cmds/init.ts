import { prompt } from 'inquirerer';
import { skitchPath, listModules, init, initSkitch } from 'skitch-utils';
import { basename } from 'path';

// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg
const username = shell
  .exec('git config --global user.name', { silent: true })
  .trim();
const email = shell
  .exec('git config --global user.email', { silent: true })
  .trim();

export default async argv => {
  try {
    await skitchPath();
  } catch (e) {
    await initSkitch();
    return;
  }

  let modules = await listModules();
  modules = Object.keys(modules).reduce(
    (m, v) => {
      if (m.includes(v)) return m;
      m.push(v);
      return m;
    },
    ['plpgsql', 'uuid-ossp', 'pgcrypto', 'plv8']
  );

  const questions = [
    {
      name: 'name',
      message: 'project name (e.g., flipr)',
      default: basename(process.cwd()),
      required: true
    },
    {
      name: 'author',
      message: 'project author',
      default: `${username} <${email}>`,
      required: true
    },
    {
      name: 'description',
      message: 'project description',
      default: 'skitch project',
      required: true
    },
    {
      name: 'extensions',
      message: 'which extensions?',
      choices: Object.key(modules),
      type: 'checkbox',
      default: ['plpgsql'],
      required: true
    }
  ];

  const { name, description, author, extensions } = await prompt(
    questions,
    argv
  );

  await init({ name, description, author, extensions });

  console.log(`

        |||
       (o o)
   ooO--(_)--Ooo-


✨  All Done!
`);
};
