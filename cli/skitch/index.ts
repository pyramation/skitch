#!/usr/bin/env node
import { skitch } from './src/cli';
var argv = require('minimist')(process.argv.slice(2));
var readFileSync = require('fs').readFileSync;

(async () => {
  if (argv.v) {
    return console.log( JSON.parse(readFileSync(__dirname + '/package.json').toJSON()).version );
  }
  await skitch(argv);
})();
