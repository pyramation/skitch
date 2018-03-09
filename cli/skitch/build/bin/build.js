"use strict";
var fs = require('fs');
var path = require('path');
var glob = require('glob').sync;
var srcDir = path.resolve(__dirname + "/../src/cmds");
var paths = glob(srcDir + "/**.ts").map(function (file) {
    var _a = file.match(/\/([a-zA-Z]+)\.ts/), name = _a[1];
    return {
        name: name,
        path: file.replace(srcDir, './cmds').replace(/\.ts$/, ''),
    };
});
var imports = paths
    .map(function (f) {
    return ["import " + f.name + " from '" + f.path + "';"];
})
    .join('\n');
var out = "\n" + imports + "\nexport default {\n  " + paths.map(function (a) { return a.name; }).join(',') + "\n}\n  ";
fs.writeFileSync(__dirname + "/../src/index.ts", out);
//# sourceMappingURL=build.js.map