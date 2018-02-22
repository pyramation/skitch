import { exec } from 'child_process';
import { filter } from 'fuzzy';
import { prompt } from 'skitch-prompt';
import templates from 'skitch-templates';

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
  const result = await prompt(questions, argv);
  console.log(result);
};
