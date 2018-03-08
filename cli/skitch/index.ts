#!/usr/bin/env node
import { skitch } from './src/cli';
var argv = require('minimist')(process.argv.slice(2));

(async () => {
  await skitch(argv);
})();
