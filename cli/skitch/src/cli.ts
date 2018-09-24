import { filter } from 'fuzzy';
import { prompt } from 'inquirerer';
import cmds from './index';
import aliases from './aliases';

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
    source: searchCmds
  }
];

export const skitch = async argv => {
  const keys = Object.keys(argv);
  if (
    keys.length === 2 &&
    keys.hasOwnProperty('_') &&
    !keys._length &&
    (keys.v || keys.version)
  ) {
    return await cmds.version(argv);
  }

  var { cmd } = await prompt(cmdQuestion, argv);
  if (!cmds.hasOwnProperty(cmd)) {
    Object.keys(aliases).forEach(aliasCmd => {
      if (
        aliases[aliasCmd] &&
        aliases[aliasCmd].length &&
        aliases[aliasCmd].includes(cmd)
      ) {
        cmd = aliasCmd;
      }
    });
    if (!cmds.hasOwnProperty(cmd)) {
      throw new Error(`${cmd} does not exist!`);
    }
  }
  await cmds[cmd](argv);
};
