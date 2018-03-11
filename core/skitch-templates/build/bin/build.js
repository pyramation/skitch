"use strict";
var fs = require('fs');
var path = require('path');
var glob = require('glob').sync;
var schemaDir = path.resolve(__dirname + "/../schemas");
var paths = glob(schemaDir + "/**.ts").map(function (file) {
    var _a = file.match(/\/([a-zA-Z]+)\.ts/), name = _a[1];
    return {
        name: name,
        path: file.replace(schemaDir, './schemas').replace(/\.ts$/, ''),
    };
});
var imports = paths
    .map(function (f) {
    return ["import * as " + f.name + " from '" + f.path + "';"];
})
    .join('\n');
var out = "\n" + imports + "\nexport default {\n  " + paths.map(function (a) { return a.name; }).join(',') + "\n};";
fs.writeFileSync(__dirname + "/../index.ts", out);
//# sourceMappingURL=build.js.map