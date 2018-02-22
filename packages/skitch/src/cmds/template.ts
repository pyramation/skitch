import { exec } from 'child_process';
import { filter } from 'fuzzy';
import { prompt } from 'skitch-prompt';
import templates from 'skitch-templates';
const templatePath =
  require.resolve('skitch-templates').split('build/index')[0] + 'src';

// sqitch add appschema -n 'Add schema for all flipr objects.'

const searchTemplates = (answers: object, input: string) => {
  console.log(Object.keys(templates));
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = filter(input, Object.keys(templates));
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, 25);
  });
};
const questions = [
  {
    type: 'autocomplete',
    name: 'template',
    message: 'what do you want to create?',
    source: searchTemplates,
  },
];

export default async argv => {
  const { template } = await prompt(questions, argv);

  const cmd = [
    'sqitch',
    'add',
    'asdsdf',
    '--template',
    template,
    '--template-directory',
    templatePath,
    '-n',
    'hi',
  ].join(' ');

  console.log(cmd);
  // const sqitch = exec(cmd.trim());
  // sqitch.stdout.pipe(process.stdout);
  // sqitch.stderr.pipe(process.stderr);
};
