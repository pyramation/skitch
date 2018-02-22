import { exec } from 'child_process';
import { filter } from 'fuzzy';
import * as inquirer from 'inquirer';
inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

import { prompt } from '../utils/inquirer';

// sqitch add appschema -n 'Add schema for all flipr objects.'

export const template = async (argv, schemas) => {
  const searchTemplates = (answers: object, input: string) => {
    input = input || '';
    return new Promise(function(resolve) {
      setTimeout(function() {
        var fuzzyResult = filter(input, Object.keys(schemas));
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
  const result = await prompt(questions, argv);
  console.log(result);
};
