import { exec } from 'child_process';
import { filter } from 'fuzzy';
import { prompt } from 'inquirerer';
import templates from 'skitch-templates';
import { InquirerQuestion } from 'skitch-types';
import { generate } from 'skitch-utils';

const templatePath =
  require.resolve('skitch-templates').split('build/index')[0] + 'src';

const searchTemplates = (answers: object, input: string) => {
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
const templateQuestion = [
  {
    _: true,
    type: 'autocomplete',
    name: 'template',
    message: 'what do you want to create?',
    source: searchTemplates
  }
];

export const aliases = ['g'];

export default async argv => {
  var { template } = await prompt(templateQuestion, argv);

  const questions: Array<InquirerQuestion> = templates[template].default;
  const answers: object = await prompt(questions, argv);

  const cmd = await generate({ templates, template, templatePath, payload });

  console.log(cmd);

  const sqitch = exec(cmd.trim());
  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
