#!/usr/bin/env node
"use strict";
var argv = require('minimist')(process.argv.slice(2));
var glob = require('glob').sync;
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp').sync;
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
        return str.split('/').filter(function (f) { return f; });
    }
    return constructPath(createPathArray(fullpath));
}
var files = glob(__dirname + "/../**/**.sql");
files.forEach(function (file) {
    var contents = fs.readFileSync(file).toString();
    if (contents.match(src)) {
        var regexp = new RegExp(src.replace(/\//g, '/'), 'g');
        fs.writeFileSync(file, contents.replace(regexp, dst));
    }
});
var dirs = {};
var ops = [];
files.filter(function (f) { return f.match(src); }).forEach(function (file) {
    var parts = file.split(src);
    var newpath = path.resolve(parts[0] + "/" + dst + "/" + parts[1]);
    var dirname = newpath.replace(/\/[^\/]*$/, '');
    dirs[dirname] = dirname;
    ops.push([file, file.replace(src, dst)]);
});
Object.keys(dirs).forEach(function (dirkey) {
    mkdirp(dirs[dirkey]);
});
ops.forEach(function (_a) {
    var src = _a[0], dst = _a[1];
    fs.renameSync(src, dst);
});
// console.log(files);
//# sourceMappingURL=rename.js.map