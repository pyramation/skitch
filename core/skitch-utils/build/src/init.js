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
require("skitch-template");
var util_1 = require("util");
var child_process_1 = require("child_process");
var paths_1 = require("./paths");
var extensions_1 = require("./extensions");
var path_1 = require("path");
var shell = require("shelljs");
var fs_1 = require("fs");
var srcPath = path_1.dirname(require.resolve('skitch-template'));
var plans_1 = require("./plans");
var utils_1 = require("./utils");
var makePackage = function (_a) {
    var name = _a.name, description = _a.description, author = _a.author;
    return {
        name: name,
        version: '0.0.1',
        description: description,
        author: author,
        private: true,
        scripts: {
            test: 'FAST_TEST=1 skitch-templatedb && jest',
            'test:watch': 'FAST_TEST=1 jest --watch',
        },
        devDependencies: {
            '@types/jest': '21.1.0',
            '@types/node': '8.0.0',
            'babel-cli': '6.24.1',
            'babel-jest': '20.0.3',
            'babel-preset-react-app': '3.0.0',
            dotenv: '5.0.1',
            jest: '20.0.4',
            'skitch-testing': 'latest',
            uuid: '3.1.0',
        },
    };
};
exports.init = function (_a) {
    var name = _a.name, description = _a.description, author = _a.author, extensions = _a.extensions;
    return __awaiter(_this, void 0, void 0, function () {
        var cmd, sqitchPath, pkg, extname, info, settings, plan;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, paths_1.skitchPath()];
                case 1:
                    _b.sent();
                    cmd = ['sqitch', 'init', name, '--engine', 'pg'].join(' ');
                    return [4 /*yield*/, util_1.promisify(child_process_1.exec)(cmd.trim())];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, paths_1.sqitchPath()];
                case 3:
                    sqitchPath = _b.sent();
                    pkg = makePackage({ name: name, description: description, author: author });
                    // initialize template
                    shell.cp('-r', srcPath + "/sqitch/*", sqitchPath + "/");
                    shell.cp('-r', srcPath + "/sqitch/.*", sqitchPath + "/");
                    fs_1.writeFileSync(sqitchPath + "/package.json", JSON.stringify(pkg, null, 2));
                    shell.mkdir('-p', sqitchPath + "/sql");
                    extname = utils_1.sluggify(name);
                    return [4 /*yield*/, extensions_1.getExtensionInfo()];
                case 4:
                    info = _b.sent();
                    return [4 /*yield*/, extensions_1.writeExtensionMakefile({ path: info.Makefile, extname: extname, version: '0.0.1' })];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, extensions_1.writeExtensionControlFile({ path: info.controlFile, extname: extname, version: '0.0.1', extensions: extensions })];
                case 6:
                    _b.sent();
                    settings = {
                        name: name,
                        projects: true
                    };
                    return [4 /*yield*/, plans_1.makePlan(sqitchPath, settings)];
                case 7:
                    plan = _b.sent();
                    fs_1.writeFileSync(sqitchPath + "/sqitch.plan", plan);
                    return [2 /*return*/];
            }
        });
    });
};
exports.initSkitch = function () { return __awaiter(_this, void 0, void 0, function () {
    var dir, name, pkg;
    return __generator(this, function (_a) {
        dir = process.cwd();
        shell.cp('-r', srcPath + "/skitch/*", dir + "/");
        shell.cp('-r', srcPath + "/skitch/.*", dir + "/");
        name = utils_1.sluggify(path_1.basename(path_1.dirname(process.cwd())));
        pkg = {
            name: name,
            dependencies: {
                'skitch-extension-defaults': 'latest',
                'skitch-extension-default-roles': 'latest',
                'skitch-extension-verify': 'latest',
                'skitch-extension-utils': 'latest'
            }
        };
        fs_1.writeFileSync(process.cwd() + "/package.json", JSON.stringify(pkg, null, 2));
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=init.js.map