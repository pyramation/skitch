(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-walkup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var walkup = require("node-walkup");
    exports.path = function (cwd) {
        if (cwd === void 0) { cwd = process.cwd(); }
        var obj;
        return new Promise(function (resolve, reject) {
            if (process.env.SKITCH_PATH) {
                return resolve(process.env.SKITCH_PATH);
            }
            if (obj) {
                return resolve(obj);
            }
            walkup('sqitch.conf', {
                cwd: process.cwd(),
            }, function (err, matches) {
                if (err) {
                    return reject(err);
                }
                if (!matches || !matches.length) {
                    console.error('Not inside of a Sqitch project');
                    process.exit(1);
                }
                obj = matches[0].dir;
                resolve(matches[0].dir);
            });
        });
    };
    exports.default = exports.path;
});
//# sourceMappingURL=index.js.map