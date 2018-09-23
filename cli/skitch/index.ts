#!/usr/bin/env node
import { skitch } from './src/cli';
var argv = require('minimist')(process.argv.slice(2));
var readFileSync = require('fs').readFileSync;
const version = require('./package.json').version;
(async () => {
  if (argv.v) {
    return console.log( version );
  }
  await skitch(argv);
})();
