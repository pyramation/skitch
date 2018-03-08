#!/usr/bin/env node

const glob = require('glob').sync;
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp').sync;

export default async argv => {
  // e.g., node ./bin/rename procedures/verify_role procedures/verify/role

  if (!argv._.length == 2) {
    throw new Error('rename <src> <dst>');
  }

  var src = sanitize_path(argv._[0]);
  var dst = sanitize_path(argv._[1]);

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
