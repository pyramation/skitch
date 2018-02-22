import { init } from './cmds/init';

const argv = require('minimist')(process.argv.slice(2));

(async () => {
  const result = await init(argv);
  console.log(result);
})();
