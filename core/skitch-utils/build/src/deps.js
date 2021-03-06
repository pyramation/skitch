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
var path_1 = require("path");
var glob_1 = require("glob");
var modules_1 = require("./modules");
var extensions_1 = require("./extensions");
var makeKey = function (sqlmodule) { return '/deploy/' + sqlmodule + '.sql'; };
exports.getDeps = function (packageDir) { return __awaiter(_this, void 0, void 0, function () {
    // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
    function dep_resolve(sqlmodule, resolved, unresolved) {
        unresolved.push(sqlmodule);
        var edges = deps[makeKey(sqlmodule)];
        if (!edges) {
            if (/:/.test(sqlmodule)) {
                external.push(sqlmodule);
                edges = deps[sqlmodule] = [];
            }
            else {
                throw new Error("no module " + sqlmodule);
            }
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
    var extname, external, deps, files, i, data, lines, key, j, m, m2, keyToTest, resolved, unresolved, index, extensions, normalSql, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, extensions_1.getExtensionName(packageDir)];
            case 1:
                extname = _b.sent();
                external = [];
                deps = {};
                return [4 /*yield*/, glob_1.sync(packageDir + "/deploy/**/**.sql")];
            case 2:
                files = _b.sent();
                for (i = 0; i < files.length; i++) {
                    data = fs_1.readFileSync(files[i]);
                    lines = data.toString().split('\n');
                    key = '/' + path_1.relative(packageDir, files[i]);
                    deps[key] = [];
                    for (j = 0; j < lines.length; j++) {
                        m = lines[j].match(/-- requires: (.*)/);
                        if (m) {
                            deps[key].push(m[1].trim());
                        }
                        if (/:/.test(lines[j])) {
                            m2 = lines[j].match(/-- Deploy ([^:]*):([\w\/]+) to pg/);
                            if (m2) {
                                keyToTest = m2[2];
                                if (extname !== m2[1]) {
                                    throw new Error('referencing bad project name inside of deploy file\n' + lines[j]);
                                }
                                if (key != makeKey(keyToTest)) {
                                    throw new Error('deployment script in wrong place or is named wrong internally\n' + lines[j]);
                                }
                            }
                        }
                        else {
                            m2 = lines[j].match(/-- Deploy (.*) to pg/);
                            if (m2) {
                                keyToTest = m2[1];
                                if (key != makeKey(keyToTest)) {
                                    throw new Error('deployment script in wrong place or is named wrong internally\n' + lines[j]);
                                }
                            }
                        }
                    }
                }
                resolved = [];
                unresolved = [];
                deps = Object.assign((_a = {},
                    _a[makeKey('apps/index')] = Object.keys(deps)
                        .filter(function (dep) { return dep.match(/^\/deploy\//); })
                        .map(function (dep) { return dep.replace(/^\/deploy\//, '').replace(/.sql$/, ''); }),
                    _a), deps);
                dep_resolve('apps/index', resolved, unresolved);
                index = resolved.indexOf('apps/index');
                resolved.splice(index);
                delete deps[makeKey('apps/index')];
                extensions = resolved.filter(function (a) { return a.match(/^extensions/); });
                normalSql = resolved.filter(function (a) { return !a.match(/^extensions/); });
                // resolved = useExtensions ? [...extensions, ...normalSql] : [...normalSql];
                resolved = extensions.concat(normalSql);
                // resolved = [...normalSql];
                return [2 /*return*/, {
                        external: external,
                        resolved: resolved,
                        deps: deps
                    }];
        }
    });
}); };
exports.extDeps = function (name) { return __awaiter(_this, void 0, void 0, function () {
    // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
    function dep_resolve(sqlmodule, resolved, unresolved) {
        unresolved.push(sqlmodule);
        var edges = deps[sqlmodule];
        if (!edges) {
            external.push(sqlmodule);
            edges = deps[sqlmodule] = [];
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
    var modules, external, deps, resolved, unresolved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, modules_1.listModules()];
            case 1:
                modules = _a.sent();
                external = [];
                if (!modules[name]) {
                    throw new Error("module " + name + " does not exist!");
                }
                deps = Object.keys(modules).reduce(function (memo, key) {
                    memo[key] = modules[key].requires;
                    return memo;
                }, {});
                resolved = [];
                unresolved = [];
                dep_resolve(name, resolved, unresolved);
                return [2 /*return*/, { external: external, resolved: resolved }];
        }
    });
}); };
//# sourceMappingURL=deps.js.map