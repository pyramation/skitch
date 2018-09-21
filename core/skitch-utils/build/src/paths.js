"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var walkup = require("node-walkup");
var sqitchPath = function (cwd) {
    if (cwd === void 0) { cwd = process.cwd(); }
    var obj;
    return new Promise(function (resolve, reject) {
        if (process.env.SQITCH_PATH) {
            return resolve(process.env.SQITCH_PATH);
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
exports.sqitchPath = sqitchPath;
var skitchPath = function (cwd) {
    if (cwd === void 0) { cwd = process.cwd(); }
    var obj;
    return new Promise(function (resolve, reject) {
        if (process.env.SKITCH_PATH) {
            return resolve(process.env.SKITCH_PATH);
        }
        if (obj) {
            return resolve(obj);
        }
        walkup('skitch.json', {
            cwd: process.cwd(),
        }, function (err, matches) {
            if (err) {
                return reject(err);
            }
            if (!matches || !matches.length) {
                console.error('Not inside of a skitch project');
                process.exit(1);
            }
            obj = matches[0].dir;
            resolve(matches[0].dir);
        });
    });
};
exports.skitchPath = skitchPath;
//# sourceMappingURL=paths.js.map