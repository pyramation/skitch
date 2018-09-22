"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var modules_1 = require("./modules");
var path_1 = require("path");
var paths_1 = require("./paths");
var fs_1 = require("fs");
exports.build = function (project) { return __awaiter(_this, void 0, void 0, function () {
    // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
    function dep_resolve(sqlmodule, resolved, unresolved) {
        unresolved.push(sqlmodule);
        var edges = deps[sqlmodule];
        if (!edges) {
            native.push(sqlmodule);
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
    var skitchPath, modules, modulesWithChanges, native, extensions, deps, resolved, unresolved, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paths_1.skitchPath()];
            case 1:
                skitchPath = _a.sent();
                return [4 /*yield*/, modules_1.listModules()];
            case 2:
                modules = _a.sent();
                return [4 /*yield*/, modules_1.getExtensionsAndModulesChanges(project)];
            case 3:
                modulesWithChanges = _a.sent();
                native = [];
                extensions = Object.keys(modules).reduce(function (m, key) {
                    var mod = modules[key];
                    m[key] = __assign({}, mod, { sql: fs_1.readFileSync(path_1.resolve(skitchPath + "/" + mod.path + "/sql/" + key + "--" + mod.version + ".sql"))
                            .toString()
                            .split('\n')
                            .filter(function (l, i) { return i !== 0; })
                            .join('\n') });
                    return m;
                }, {});
                deps = Object.keys(extensions).reduce(function (m, k) {
                    m[k] = extensions[k].requires;
                    return m;
                }, {});
                resolved = [];
                unresolved = [];
                dep_resolve(project, resolved, unresolved);
                sql = [];
                resolved.forEach(function (extension) {
                    if (native.includes(extension)) {
                        sql.push("CREATE EXTENSION IF NOT EXISTS \"" + extension + "\" CASCADE;");
                    }
                    else {
                        sql.push(extensions[extension].sql);
                    }
                });
                return [2 /*return*/, sql.join('\n')];
        }
    });
}); };
//# sourceMappingURL=build.js.map