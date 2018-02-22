import { skitch } from './src/skitch';
var argv = require('minimist')(process.argv.slice(2));

(async () => {
  await skitch(argv);
})();
