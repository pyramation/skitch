#!/usr/bin/env node
import { prompt } from 'inquirerer';

const glob = require('glob').sync;
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp').sync;

const questions = [
  {
    _: true,
    name: 'src',
    message: 'src',
    required: true,
  },
  {
    _: true,
    name: 'dst',
    message: 'dst',
    required: true,
  },
];

export default async argv => {
  // e.g., node ./bin/rename procedures/verify_role procedures/verify/role

  let { src, dst } = await prompt(questions, argv);

  src = sanitize_path(src);
  dst = sanitize_path(dst);

  function sanitize_path(fullpath) {
    function constructPath(pathArray) {
      return pathArray.length ? pathArray.join('/') : '';
    }

    // TODO: NOT DRY
    function createPathArray(str) {
      return str.split('/').filter(f => f);
    }

    return constructPath(createPathArray(fullpath));
  }

  var files = glob(`${__dirname}/../**/**.sql`);

  files.forEach(file => {
    var contents = fs.readFileSync(file).toString();
    if (contents.match(src)) {
      var regexp = new RegExp(src.replace(/\//g, '/'), 'g');
      fs.writeFileSync(file, contents.replace(regexp, dst));
    }
  });
  var dirs = {};
  var ops = [];
  files.filter(f => f.match(src)).forEach(file => {
    var parts = file.split(src);
    var newpath = path.resolve(`${parts[0]}/${dst}/${parts[1]}`);
    var dirname = newpath.replace(/\/[^\/]*$/, '');
    dirs[dirname] = dirname;
    ops.push([file, file.replace(src, dst)]);
  });

  Object.keys(dirs).forEach(dirkey => {
    mkdirp(dirs[dirkey]);
  });
  ops.forEach(([src, dst]) => {
    fs.renameSync(src, dst);
  });

  // console.log(files);
};
