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
var paths_1 = require("./paths");
var fs_2 = require("fs");
var _listModules = null;
exports.listModules = function () { return __awaiter(_this, void 0, void 0, function () {
    var path, moduleFiles, extensions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (_listModules)
                    return [2 /*return*/, _listModules];
                return [4 /*yield*/, paths_1.skitchPath()];
            case 1:
                path = _a.sent();
                moduleFiles = glob_1.sync(path + '/**/*.control').filter(function (c) { return !/node_modules/.test(c); }).concat(fs_2.existsSync(path + '/node_modules') ? glob_1.sync(path + '/node_modules/**/*.control') : []);
                extensions = moduleFiles.reduce(function (m, v) {
                    if (/node_modules/.test(v))
                        return m;
                    var contents = fs_1.readFileSync(v).toString();
                    var key = path_1.basename(v).split('.control')[0];
                    m[key] = {};
                    m[key] = { path: path_1.dirname(path_1.relative(path, v)) };
                    m[key].requires = contents
                        .split('\n')
                        .find(function (el) { return /^requires/.test(el); })
                        .split('=')[1]
                        .split(',')
                        .map(function (el) { return el.replace(/[\'\s]*/g, '').trim(); });
                    m[key].version = contents
                        .split('\n')
                        .find(function (el) { return /^default_version/.test(el); })
                        .split('=')[1]
                        .replace(/[\']*/g, '')
                        .trim();
                    return m;
                }, {});
                _listModules = extensions;
                return [2 /*return*/, extensions];
        }
    });
}); };
exports._clearModuleCache = function () {
    _listModules = null;
};
exports.latestChange = function (sqlmodule) { return __awaiter(_this, void 0, void 0, function () {
    var modules, path, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.listModules()];
            case 1:
                modules = _a.sent();
                if (!modules[sqlmodule]) {
                    throw new Error("latestChange() " + sqlmodule + " NOT FOUND!");
                }
                return [4 /*yield*/, paths_1.skitchPath()];
            case 2:
                path = _a.sent();
                plan = fs_1.readFileSync(path + "/" + modules[sqlmodule].path + "/sqitch.plan")
                    .toString()
                    .split('\n')
                    .map(function (a) { return a.trim(); })
                    .filter(function (a) { return a; });
                return [2 /*return*/, plan[plan.length - 1].split(' ')[0]];
        }
    });
}); };
exports.getExtensionsAndModules = function (sqlmodule) { return __awaiter(_this, void 0, void 0, function () {
    var modules, native, sqitch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.listModules()];
            case 1:
                modules = _a.sent();
                if (!modules[sqlmodule]) {
                    throw new Error("getExtensionsAndModules() " + sqlmodule + " NOT FOUND!");
                }
                native = modules[sqlmodule].requires.filter(function (a) { return !Object.keys(modules).includes(a); });
                sqitch = modules[sqlmodule].requires.filter(function (a) {
                    return Object.keys(modules).includes(a);
                });
                return [2 /*return*/, {
                        native: native,
                        sqitch: sqitch
                    }];
        }
    });
}); };
exports.getExtensionsAndModulesChanges = function (sqlmodule) { return __awaiter(_this, void 0, void 0, function () {
    var modules, sqitchies, i, mod, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, exports.getExtensionsAndModules(sqlmodule)];
            case 1:
                modules = _d.sent();
                sqitchies = [];
                i = 0;
                _d.label = 2;
            case 2:
                if (!(i < modules.sqitch.length)) return [3 /*break*/, 5];
                mod = modules.sqitch[i];
                _b = (_a = sqitchies).push;
                _c = { name: mod };
                return [4 /*yield*/, exports.latestChange(mod)];
            case 3:
                _b.apply(_a, [(_c.latest = _d.sent(), _c)]);
                _d.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                modules.sqitch = sqitchies;
                return [2 /*return*/, modules];
        }
    });
}); };
//# sourceMappingURL=modules.js.map