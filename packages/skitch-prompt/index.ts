import { exec } from 'child_process';
import 'colors';
import * as inquirer from 'inquirer';
inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

export interface InquirerQuestion {
  name: string;
  message: string;
  required?: boolean;
  validate?: Function;
}

export const required = (questions: Array<InquirerQuestion>) => {
  return questions.map(q => {
    if (q.required && !q.validate) {
      q.validate = (value: any) => {
        if (!value) {
          return `${q.name} is required`;
        }
        return true;
      };
    }
    return q;
  });
};

export const names = (questions: Array<InquirerQuestion>) => {
  return questions.map(q => {
    q.message = `${'['.white}${q.name.blue}${']'.white} ${q.message}`;
    return q;
  });
};

export const filter = (
  questions: Array<InquirerQuestion>,
  answers: { [type: string]: any }
) => {
  const A = questions.map(q => q.name);
  const B = Object.keys(answers);
  const diff = A.filter(x => !B.includes(x));
  return A.filter(n => diff.includes(n)).map(name =>
    questions.find(o => o.name === name)
  );
};

export const prompt = async (
  questions: Array<InquirerQuestion>,
  answers: { [type: string]: any }
) => {
  const result = await inquirer.prompt(filter(required(questions), answers));

  return {
    ...result,
    ...answers,
  };
};
