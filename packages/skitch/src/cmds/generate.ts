import { exec } from 'child_process';
import { filter } from 'fuzzy';
import { prompt } from 'skitch-prompt';
import templates from 'skitch-templates';
import { InquirerQuestion, ChangePathArray } from 'skitch-types';
const templatePath =
  require.resolve('skitch-templates').split('build/index')[0] + 'src';

// sqitch add appschema -n 'Add schema for all flipr objects.'

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
    type: 'autocomplete',
    name: 'template',
    message: 'what do you want to create?',
    source: searchTemplates,
  },
];

export default async argv => {
  console.log(argv);
  const res = await prompt(templateQuestion, argv);
  const template = res.template;
  const _ = res._;
  console.log(_, res);
  // const { template } = await prompt(templateQuestion, argv);

  const questions: Array<InquirerQuestion> = templates[template].default;
  const answers: object = await prompt(questions, argv);

  var params: Array<{ key: string; value: any }> = Object.keys(answers).reduce(
    (m: Array<{ key: string; value: any }>, v: string) => {
      if (answers[v] instanceof Array) {
        m.push({
          key: `arr__${v}`,
          value: answers[v].join(','),
        });
        // cannot detect arrays, so for elements of 1, need to tell template it is not an array for elements of one
        if (answers[v].length > 1) {
          m.push({
            key: `${v}__is_array`,
            value: true,
          });
        }
        answers[v].forEach((value: string) => {
          m.push({
            key: v,
            value: value,
          });
        });
      } else {
        if (typeof answers[v] === 'boolean' && !answers[v]) {
          return m;
        }
        m.push({
          key: v,
          value: answers[v],
        });
      }
      return m;
    },
    []
  );
  var vars = params.map(obj => `--set ${obj.key}="${obj.value}"`).join(' ');

  let change = templates[template].change(answers);
  var reqd: ChangePathArray = [];
  let reqs: Array<ChangePathArray> = templates[template]
    .requires(answers)
    .filter((req: ChangePathArray) => {
      if (reqd.includes(req.join('/'))) {
        return false;
      }
      reqd.push(req.join('/'));
      return true;
    })
    .map((req: ChangePathArray) => {
      return `-r ${req.join('/')}`;
    })
    .join(' ');

  change = change.join('/');
  if (!change || change === '' || change === '/') {
    throw new Error('no change found!');
  }

  const cmd = [
    'sqitch',
    'add',
    change,
    '--template',
    template,
    '--template-directory',
    templatePath,
    '-n',
    `'add ${change}'`,
    vars,
    reqs,
  ].join(' ');

  const sqitch = exec(cmd.trim());
  sqitch.stdout.pipe(process.stdout);
  sqitch.stderr.pipe(process.stderr);
};
