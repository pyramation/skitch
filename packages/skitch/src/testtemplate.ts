import { template } from './cmds/template';

const argv = require('minimist')(process.argv.slice(2));

(async () => {
  const result = await template(argv);
  console.log(result);
})();
