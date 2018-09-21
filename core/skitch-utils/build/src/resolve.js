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
var util_1 = require("util");
var fs = require('fs');
var glob = require('glob');
var readFile = util_1.promisify(fs.readFile);
var asyncGlob = util_1.promisify(glob);
exports.resolve = function (pkgDir, scriptType) {
    if (pkgDir === void 0) { pkgDir = process.cwd(); }
    if (scriptType === void 0) { scriptType = 'deploy'; }
    return __awaiter(_this, void 0, void 0, function () {
        // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
        function dep_resolve(sqlmodule, resolved, unresolved) {
            unresolved.push(sqlmodule);
            var edges = deps['/deploy/' + sqlmodule + '.sql'];
            if (!edges) {
                throw new Error("no module " + sqlmodule);
            }
            for (var i = 0; i < edges.length; i++) {
                var dep = edges[i];
                if (!resolved.includes(dep)) {
                    if (unresolved.includes(dep)) {
                        throw new Error("Circular reference detected " + sqlmodule + ", " + dep);
                    }
                    dep_resolve(dep, resolved, unresolved);
                }
            }
            resolved.push(sqlmodule);
            var index = unresolved.indexOf(sqlmodule);
            unresolved.splice(index);
        }
        var sqlfile, deps, files, i, data, lines, key, j, m, m2, resolved, unresolved, index, extensions, normalSql, cfiles, runners;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sqlfile = [];
                    deps = {};
                    return [4 /*yield*/, asyncGlob(pkgDir + '/deploy/**/**.sql')];
                case 1:
                    files = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < files.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, readFile(files[i])];
                case 3:
                    data = _a.sent();
                    lines = data.toString().split('\n');
                    key = files[i].split(pkgDir)[1];
                    deps[key] = [];
                    for (j = 0; j < lines.length; j++) {
                        m = lines[j].match(/-- requires: (.*)/);
                        if (m) {
                            deps[key].push(m[1].trim());
                        }
                        m2 = lines[j].match(/-- Deploy (.*) to pg/);
                        if (m2) {
                            if (key !== "/deploy/" + m2[1] + ".sql") {
                                throw new Error('deployment script in wrong place or is named wrong internally');
                            }
                        }
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    resolved = [];
                    unresolved = [];
                    // add one new dep, "the app index"
                    // which has a dependancy of every module! (kinda a hack)
                    deps = Object.assign({
                        '/deploy/apps/index.sql': Object.keys(deps)
                            .filter(function (dep) { return dep.match(/^\/deploy\//); })
                            .map(function (dep) { return dep.replace(/^\/deploy\//, '').replace(/.sql$/, ''); }),
                    }, deps);
                    dep_resolve('apps/index', resolved, unresolved);
                    index = resolved.indexOf('apps/index');
                    resolved.splice(index);
                    extensions = resolved.filter(function (a) { return a.match(/^extensions/); });
                    normalSql = resolved.filter(function (a) { return !a.match(/^extensions/); });
                    resolved = extensions.concat(normalSql);
                    if (scriptType === 'revert') {
                        resolved = resolved.reverse();
                    }
                    cfiles = resolved.map(function (file) { return pkgDir + "/" + scriptType + "/" + file + ".sql"; });
                    runners = [];
                    cfiles.forEach(function (p) {
                        var modName = p.split("/" + scriptType + "/")[1];
                        var dscript = fs.readFileSync(p).toString();
                        sqlfile.push(dscript);
                    });
                    // TODO use streams
                    return [2 /*return*/, sqlfile.join('\n')];
            }
        });
    });
};
//# sourceMappingURL=resolve.js.map