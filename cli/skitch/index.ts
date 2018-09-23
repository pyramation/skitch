#!/usr/bin/env node
import { skitch } from './src/cli';
var argv = require('minimist')(process.argv.slice(2));

(async () => {
  if (argv.v) {
    return console.log( require(__dirname + '/package.json').version );
  }
  await skitch(argv);
})();
