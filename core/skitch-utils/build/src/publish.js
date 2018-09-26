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
var shell = require("shelljs");
var modules_1 = require("./modules");
var extensions_1 = require("./extensions");
var package_1 = require("./package");
var paths_1 = require("./paths");
var semver = require("semver");
var releaseTypes = [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease'
];
exports.publish = function (sqlmodule, release) {
    if (release === void 0) { release = 'patch'; }
    return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var cur, path, modules, mod, info, packageDir, version, modulesAndChanges, needsTag, keys, pkg, i, info_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cur = process.cwd();
                    if (!releaseTypes.includes(release)) {
                        throw new Error('not a proper release');
                    }
                    return [4 /*yield*/, paths_1.skitchPath()];
                case 1:
                    path = _a.sent();
                    return [4 /*yield*/, modules_1.listModules()];
                case 2:
                    modules = _a.sent();
                    mod = modules[sqlmodule];
                    return [4 /*yield*/, extensions_1.getExtensionInfo(path + "/" + mod.path)];
                case 3:
                    info = _a.sent();
                    shell.rm(info.packageDir + '/sql/' + info.sqlFile);
                    packageDir = info.packageDir;
                    version = semver.inc(info.version, release);
                    return [4 /*yield*/, modules_1.getExtensionsAndModulesChanges(sqlmodule)];
                case 4:
                    modulesAndChanges = _a.sent();
                    return [4 /*yield*/, modulesAndChanges.sqitch.reduce(function (m, v) { return __awaiter(_this, void 0, void 0, function () {
                            var mod, info;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (/^@/.test(v.latest)) {
                                            return [2 /*return*/, m];
                                        }
                                        mod = modules[v.name];
                                        return [4 /*yield*/, extensions_1.getExtensionInfo(path + "/" + mod.path)];
                                    case 1:
                                        info = _a.sent();
                                        if (semver.gt(info.version, version)) {
                                            m.version = semver.inc(info.version, release);
                                            version = m.version;
                                        }
                                        shell.rm(info.packageDir + '/sql/' + info.sqlFile);
                                        m.deps[v.name] = { versionInfo: v, info: info };
                                        return [2 /*return*/, m];
                                }
                            });
                        }); }, { version: version, deps: {} })];
                case 5:
                    needsTag = _a.sent();
                    keys = Object.keys(needsTag.deps);
                    pkg = require(packageDir + '/package.json');
                    pkg.dependencies = pkg.dependencies || [];
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < keys.length)) return [3 /*break*/, 9];
                    info_1 = needsTag.deps[keys[i]].info;
                    // tag and write package
                    process.chdir(info_1.packageDir);
                    shell.exec("sqitch tag " + version + " -n 'tag " + version + "'", {
                        cwd: info_1.packageDir
                    });
                    return [4 /*yield*/, package_1.writePackage(version, true, info_1.packageDir)];
                case 7:
                    _a.sent();
                    // add update
                    process.chdir(packageDir);
                    shell.exec("sqitch add updates/" + keys[i] + "/" + version + " -r " + keys[i] + ":@" + version + " -n 'update " + version + "'", {
                        cwd: packageDir
                    });
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9:
                    process.chdir(packageDir);
                    shell.exec("sqitch tag " + version + " -n 'tag " + version + "'", {
                        cwd: packageDir
                    });
                    return [4 /*yield*/, package_1.writePackage(version, true, packageDir)];
                case 10:
                    _a.sent();
                    process.chdir(cur);
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=publish.js.map