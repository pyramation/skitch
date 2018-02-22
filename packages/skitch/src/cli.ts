import { filter } from 'fuzzy';
import { prompt } from 'skitch-prompt';
import * as cmds from './index';

export const searchCmds = (answers: object, input: string) => {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = filter(input, Object.keys(cmds));
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, 25);
  });
};

export const skitch = async argv => {
  var { _, ...body } = argv;
  var cmd;
  if (!argv._.length) {
    var answer = await prompt([
      {
        type: 'autocomplete',
        name: 'cmd',
        message: 'what do you want to create?',
        source: searchCmds,
      },
    ]);
    cmd = answer.cmd;
  } else {
    cmd = _[0];
  }

  if (!cmds.hasOwnProperty(cmd)) {
    throw new Error(`${cmd} does not exist!`);
  }

  await cmds[cmd](argv);

  //
  // var questions: Array<InquirerQuestion> = schemas[template];
  // var override: HashObject = {};
  // Object.keys(body).forEach(param => {
  //   questions = questions.filter(question => {
  //     if (question.name === param) {
  //       override[param] = body[param];
  //       return false;
  //     }
  //     return question;
  //   });
  // });
  // var answers: object = await inquirer.prompt(questions);
  // var result = Object.assign({}, answers, override);
  //
  // var params: Array<{ key: string; value: any }> = Object.keys(result).reduce(
  //   (m: Array<{ key: string; value: any }>, v: string) => {
  //     if (result[v] instanceof Array) {
  //       m.push({
  //         key: `arr__${v}`,
  //         value: result[v].join(','),
  //       });
  //       // cannot detect arrays, so for elements of 1, need to tell template it is not an array for elements of one
  //       if (result[v].length > 1) {
  //         m.push({
  //           key: `${v}__is_array`,
  //           value: true,
  //         });
  //       }
  //       result[v].forEach((value: string) => {
  //         m.push({
  //           key: v,
  //           value: value,
  //         });
  //       });
  //     } else {
  //       if (typeof result[v] === 'boolean' && !result[v]) {
  //         return m;
  //       }
  //       m.push({
  //         key: v,
  //         value: result[v],
  //       });
  //     }
  //     return m;
  //   },
  //   []
  // );
  // var vars = params.map(obj => `--set ${obj.key}="${obj.value}"`).join(' ');
  //
  // let change = changes[template](result);
  // var reqd: ChangePathArray = [];
  // let reqs: Array<ChangePathArray> = requires[template](result)
  //   .filter((req: ChangePathArray) => {
  //     if (reqd.includes(req.join('/'))) {
  //       return false;
  //     }
  //     reqd.push(req.join('/'));
  //     return true;
  //   })
  //   .map((req: ChangePathArray) => {
  //     return `-r ${req.join('/')}`;
  //   })
  //   .join(' ');
  //
  // change = change.join('/');
  // if (!change || change === '' || change === '/') {
  //   throw new Error('no change found!');
  // }
  //
  // var cmd = `
  // sqitch add ${change} --template ${template} -n 'add ${change}' ${vars} ${reqs}
  // `;
  //
  // console.log(cmd);
  //
  // const sqitch = exec(cmd.trim());
  //
  // sqitch.stdout.pipe(process.stdout);
  // sqitch.stderr.pipe(process.stderr);
};
