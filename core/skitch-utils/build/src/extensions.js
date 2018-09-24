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
var glob_1 = require("glob");
var paths_1 = require("./paths");
var fs_1 = require("fs");
exports.getAvailableExtensions = function () { return __awaiter(_this, void 0, void 0, function () {
    var modules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, listModules()];
            case 1:
                modules = _a.sent();
                modules = Object.keys(modules).reduce(function (m, v) {
                    if (m.includes(v))
                        return m;
                    m.push(v);
                    return m;
                }, ['plpgsql', 'uuid-ossp', 'pgcrypto', 'plv8']);
                return [2 /*return*/, modules];
        }
    });
}); };
exports.getInstalledExtensions = function () { return __awaiter(_this, void 0, void 0, function () {
    var modules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, listModules()];
            case 1:
                modules = _a.sent();
                return [2 /*return*/, Object.keys(modules)];
        }
    });
}); };
exports.writeExtensionsToEnv = function () { return __awaiter(_this, void 0, void 0, function () {
    var sqitchPath, controlFile, envFile, extensions, envs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paths_1.sqitchPath()];
            case 1:
                sqitchPath = _a.sent();
                controlFile = glob_1.sync(sqitchPath + "/*.control");
                envFile = glob_1.sync(sqitchPath + "/.env");
                if (!controlFile || !controlFile.length) {
                    throw new Error('no control file found!');
                }
                if (!envFile || !envFile.length) {
                    throw new Error('no control file found!');
                }
                try {
                    extensions = fs_1.readFileSync(controlFile[0])
                        .toString()
                        .split('\n')
                        .find(function (line) { return line.match(/^requires/); })
                        .split('=')[1]
                        .split('\'')[1]
                        .split(',')
                        .map(function (a) { return a.trim(); });
                }
                catch (e) {
                    throw new Error('missing requires from control files or bad syntax');
                }
                try {
                    envs = fs_1.readFileSync(envFile[0])
                        .toString()
                        .split('\n')
                        .reduce(function (m, line) {
                        line = (line || '').trim();
                        if (/^#/.test(line))
                            return m;
                        if (!line.length)
                            return m;
                        var parts = line.split('=');
                        m[parts[0].trim()] = parts[1].trim();
                        return m;
                    }, {});
                }
                catch (e) {
                    throw new Error('missing env files or bad syntax');
                }
                envs.PGEXTENSIONS = extensions.join(',');
                fs_1.writeFileSync(envFile[0], Object.keys(envs).reduce(function (m, key) {
                    var value = envs[key];
                    m = m + "\n" + key + "=" + value;
                    return m;
                }, ''));
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=extensions.js.map