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
var path_1 = require("path");
var modules_1 = require("./modules");
var paths_1 = require("./paths");
var deps_1 = require("./deps");
var skitch_env_1 = require("skitch-env");
var pg = require('pg');
// should we be parsing the plan file?
// currently assuming only extensions in control file...
exports.revert = function (name, database, opts) { return __awaiter(_this, void 0, void 0, function () {
    var modules, path, extensions, pgPool, i, extension, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, modules_1.listModules()];
            case 1:
                modules = _a.sent();
                return [4 /*yield*/, paths_1.skitchPath()];
            case 2:
                path = _a.sent();
                if (!modules[name]) {
                    throw new Error("module " + name + " does not exist!");
                }
                return [4 /*yield*/, deps_1.extDeps(name)];
            case 3:
                extensions = _a.sent();
                pgPool = new pg.Pool({
                    connectionString: "postgres://" + skitch_env_1.PGUSER + ":" + skitch_env_1.PGPASSWORD + "@" + skitch_env_1.PGHOST + ":" + skitch_env_1.PGPORT + "/" + database
                });
                // just reverse it
                extensions.resolved = extensions.resolved.reverse();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < extensions.resolved.length)) return [3 /*break*/, 11];
                extension = extensions.resolved[i];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 9, , 10]);
                if (!extensions.external.includes(extension)) return [3 /*break*/, 7];
                console.log("DROP EXTENSION IF EXISTS \"" + extension + "\" CASCADE;");
                return [4 /*yield*/, pgPool.query("DROP EXTENSION IF EXISTS \"" + extension + "\" CASCADE;")];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                console.log(modules[extension].path);
                console.log("sqitch revert db:pg:" + database + " -y");
                shell.exec("sqitch revert db:pg:" + database + " -y", {
                    cwd: path_1.resolve(path, modules[extension].path),
                    env: {
                        PGUSER: skitch_env_1.PGUSER,
                        PGPASSWORD: skitch_env_1.PGPASSWORD,
                        PGHOST: skitch_env_1.PGHOST,
                        PGPORT: skitch_env_1.PGPORT,
                        PATH: skitch_env_1.PATH
                    }
                });
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 11];
            case 10:
                i++;
                return [3 /*break*/, 4];
            case 11:
                pgPool.end();
                return [2 /*return*/, extensions];
        }
    });
}); };
//# sourceMappingURL=revert.js.map