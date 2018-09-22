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
var paths_1 = require("./paths");
var modules_1 = require("./modules");
var deps_1 = require("./deps");
exports.makePlan = function (packageDir, options) { return __awaiter(_this, void 0, void 0, function () {
    var name, uri, projects, now, planfile, external, _a, resolved, external, deps, externalReqs, skPath, results, makeKey;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = options.name, uri = options.uri, projects = options.projects;
                if (!name) {
                    throw new Error('plans require a project name');
                }
                if (!uri)
                    uri = name;
                now = '2017-08-11T08:11:51Z';
                planfile = [];
                external = [];
                planfile.push("%syntax-version=1.0.0\n  %project=" + name + "\n  %uri=" + name + "\n\n  ");
                return [4 /*yield*/, deps_1.getDeps(packageDir)];
            case 1:
                _a = _b.sent(), resolved = _a.resolved, external = _a.external, deps = _a.deps;
                externalReqs = [];
                if (!projects) return [3 /*break*/, 4];
                return [4 /*yield*/, paths_1.skitchPath()];
            case 2:
                skPath = _b.sent();
                return [4 /*yield*/, modules_1.getExtensionsAndModulesChanges(name)];
            case 3:
                results = _b.sent();
                [].push.apply(externalReqs, results.sqitch);
                _b.label = 4;
            case 4:
                makeKey = function (sqlmodule) { return '/deploy/' + sqlmodule + '.sql'; };
                [].push.apply(deps[makeKey(resolved[0])], externalReqs.map(function (a) { return a.name + ":" + a.latest; }));
                resolved.forEach(function (res) {
                    // TODO allow for two plans
                    if (/:/.test(res))
                        return;
                    if (deps[makeKey(res)] && deps[makeKey(res)].length) {
                        planfile.push(res + " [" + deps[makeKey(res)].join(' ') + "] " + now + " skitch <skitch@5b0c196eeb62> # add " + res);
                    }
                    else {
                        planfile.push(res + " " + now + " skitch <skitch@5b0c196eeb62> # add " + res);
                    }
                });
                return [2 /*return*/, planfile.join('\n')];
        }
    });
}); };
exports.getPlan = function (options) { return __awaiter(_this, void 0, void 0, function () {
    var modules, path, packageDir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, modules_1.listModules()];
            case 1:
                modules = _a.sent();
                if (!modules[options.name]) {
                    throw new Error(options.name + " NOT FOUND!");
                }
                return [4 /*yield*/, paths_1.skitchPath()];
            case 2:
                path = _a.sent();
                packageDir = path + "/" + modules[options.name].path;
                return [4 /*yield*/, exports.makePlan(packageDir, options)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=plans.js.map