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
    q.message = `${'['.white}${q.name.blue}${']'.white} ${q.message.green}`;
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

// converts argv._ into the answers when question specifies it
export const _filter = (
  questions: Array<InquirerQuestion>,
  answers: { [type: string]: any }
) => {
  const _Qs = questions.filter(q => q.hasOwnProperty('_'));
  const A = _Qs.map((v, i) => i + '');
  const B = Object.keys(answers._ || []);
  var includes = A.filter(x => B.includes(x));
  for (var i = 0; i < includes.length; i++) {
    answers[_Qs[i].name] = answers._.shift();
  }
  const diff = A.filter(x => !B.includes(x));
  return A.filter(n => diff.includes(n)).map(name =>
    questions.find(o => o.name === name)
  );
};

export const prompt = async (
  questions: Array<InquirerQuestion>,
  answers: { [type: string]: any }
) => {
  const _1 = _filter(questions, answers);
  const _2 = filter(_1, answers);
  const result = await inquirer.prompt(names(required(_2)));

  return {
    ...result,
    ...answers,
  };
};
