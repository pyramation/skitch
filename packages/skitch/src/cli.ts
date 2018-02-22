import { filter } from 'fuzzy';
import { prompt } from 'skitch-prompt';
import cmds from './index';

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
    var answer = await prompt(
      [
        {
          type: 'autocomplete',
          name: 'cmd',
          message: 'what do you want to create?',
          source: searchCmds,
        },
      ],
      {}
    );
    cmd = answer.cmd;
  } else {
    cmd = _[0];
  }

  if (!cmds.hasOwnProperty(cmd)) {
    throw new Error(`${cmd} does not exist!`);
  }

  await cmds[cmd](argv);
};
