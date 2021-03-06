"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var inquirerer_1 = require("inquirerer");
var path_1 = require("path");
var glob_1 = require("glob");
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
    function dep_resolve(sqlmodule, resolved, unresolved) {
        unresolved.push(sqlmodule);
        var edges = deps[sqlmodule];
        if (!edges) {
            native.push(sqlmodule);
            edges = deps[sqlmodule] = [];
        }
        for (var i = 0; i < edges.length; i++) {
            var dep_1 = edges[i];
            if (!resolved.includes(dep_1)) {
                if (unresolved.includes(dep_1)) {
                    throw new Error("Circular reference detected " + sqlmodule + ", " + dep_1);
                }
                dep_resolve(dep_1, resolved, unresolved);
            }
        }
        resolved.push(sqlmodule);
        var index = unresolved.indexOf(sqlmodule);
        unresolved.splice(index);
    }
    var native, usePath, extensions, deps, resolved, unresolved, questions, _a, dep, path, database, sh;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                native = [];
                usePath = process.cwd();
                extensions = glob_1.sync(usePath + '/**/*.control').reduce(function (m, v) {
                    var contents = fs_1.readFileSync(v).toString();
                    var key = path_1.basename(v).split('.control')[0];
                    m[key] = {};
                    m[key] = { path: v };
                    m[key].requires = contents
                        .split('\n')
                        .find(function (el) { return /^requires/.test(el); })
                        .split('=')[1]
                        .split(',').map(function (el) {
                        return el
                            .replace(/[\'\s]*/g, '')
                            .trim();
                    });
                    // m[key].version = contents
                    //                   .split('\n')
                    //                   .find(el=>/^default_version/.test(el))
                    //                   .split('=')[1]
                    //                   .replace(/[\']*/g, '')
                    //                   .trim()
                    //                   ;
                    // m[key].sql = readFileSync(resolve(`${dirname(v)}/sql/${key}--${m[key].version}.sql`)).toString().split('\n').filter((l, i)=>i!==0).join('\n');
                    // m[key].plan = readFileSync(resolve(`${dirname(v)}/sqitch.plan`)).toString();
                    m[key].sqitchPath = path_1.dirname(v);
                    return m;
                }, {});
                deps = Object.keys(extensions).reduce(function (m, k) {
                    m[k] = extensions[k].requires;
                    return m;
                }, {});
                resolved = [];
                unresolved = [];
                questions = [
                    {
                        _: true,
                        type: 'list',
                        name: 'dep',
                        message: 'choose a dep',
                        choices: Object.keys(extensions),
                        required: true,
                    },
                    {
                        _: true,
                        name: 'path',
                        message: 'choose a name',
                        filter: function (val) {
                            val = /.sh$/.test(val) ? val : val + '.sh';
                            return path_1.resolve(usePath + '/' + val);
                        },
                        required: true,
                    },
                    {
                        _: true,
                        name: 'database',
                        message: 'database',
                        required: true,
                    },
                ];
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 1:
                _a = _b.sent(), dep = _a.dep, path = _a.path, database = _a.database;
                dep_resolve(dep, resolved, unresolved);
                sh = [
                    '#!/bin/bash',
                    'export PGUSER=postgres;',
                    'export PGHOST=localhost;',
                    'export PGPASSWORD=password;',
                    "export DATABASE=\"" + database + "\";",
                    "createdb \"$DATABASE\";"
                ];
                resolved.forEach(function (extension) {
                    if (native.includes(extension)) {
                        sh.push("psql --dbname \"$DATABASE\" -c 'CREATE EXTENSION IF NOT EXISTS \"" + extension + "\" CASCADE;'");
                    }
                    else {
                        // sh.push(`SQITCH_PATH=${extensions[extension].sqitchPath}`);
                        // sh.push(`SQITCH_PATH=${extensions[extension].sqitchPath} skitch deploy`);
                        // shell.exec(`PGUSER=postgres PGHOST=localhost sqitch deploy db:pg:${db}`);
                        // shell.exec(`cd ${}`);
                        // NOTE just local right now
                        sh.push("cd " + extensions[extension].sqitchPath);
                        sh.push("sqitch deploy db:pg:$DATABASE");
                    }
                });
                fs_1.writeFileSync(path, sh.join('\n'));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=sqitch.js.map