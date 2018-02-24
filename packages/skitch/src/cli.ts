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

const cmdQuestion = [
  {
    _: true,
    type: 'autocomplete',
    name: 'cmd',
    message: 'what do you want to do?',
    source: searchCmds,
  },
];

export const skitch = async argv => {
  var { cmd } = await prompt(cmdQuestion, argv);
  if (!cmds.hasOwnProperty(cmd)) {
    throw new Error(`${cmd} does not exist!`);
  }
  await cmds[cmd](argv);
};
