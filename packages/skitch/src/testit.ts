import { prompt } from 'skitch-prompt';

const argv = require('minimist')(process.argv.slice(2));
const questions = [
  {
    name: 'name',
    message: 'name',
    required: true,
  },
  {
    name: 'boom',
    message: 'boom',
    required: true,
  },
];

(async () => {
  const result = await prompt(questions, argv);
  console.log(result);
})();
