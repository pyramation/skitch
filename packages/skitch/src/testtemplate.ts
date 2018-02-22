import { template } from './cmds/template';

const argv = require('minimist')(process.argv.slice(2));
import schemas from './schemas';

(async () => {
  const result = await template(argv, schemas);
  console.log(result);
})();
