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
var skitch_env_1 = require("skitch-env");
var pg = require('pg');
// should we be parsing the plan file?
// currently assuming only extensions in control file...
exports.deploy = function (name, database, opts) { return __awaiter(_this, void 0, void 0, function () {
    var path, modules, extensions, pgPool, n, extension, n, extension;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paths_1.skitchPath()];
            case 1:
                path = _a.sent();
                return [4 /*yield*/, modules_1.listModules()];
            case 2:
                modules = _a.sent();
                return [4 /*yield*/, modules_1.getExtensionsAndModules(name)];
            case 3:
                extensions = _a.sent();
                pgPool = new pg.Pool({
                    connectionString: "postgres://" + skitch_env_1.PGUSER + ":" + skitch_env_1.PGPASSWORD + "@" + skitch_env_1.PGHOST + ":" + skitch_env_1.PGPORT + "/" + database
                });
                n = 0;
                _a.label = 4;
            case 4:
                if (!(n < extensions.native.length)) return [3 /*break*/, 7];
                extension = extensions.native[n];
                console.log("CREATE EXTENSION IF NOT EXISTS \"" + extension + "\" CASCADE;");
                return [4 /*yield*/, pgPool.query("CREATE EXTENSION IF NOT EXISTS \"" + extension + "\" CASCADE;")];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                n++;
                return [3 /*break*/, 4];
            case 7:
                pgPool.end();
                n = 0;
                _a.label = 8;
            case 8:
                if (!(n < extensions.sqitch.length)) return [3 /*break*/, 11];
                extension = extensions.sqitch[n];
                return [4 /*yield*/, exports.deploy(extension, database, opts)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                n++;
                return [3 /*break*/, 8];
            case 11:
                console.log(modules[name].path);
                console.log("sqitch deploy db:pg:" + database);
                shell.exec("sqitch deploy db:pg:" + database, {
                    cwd: path_1.resolve(path, modules[name].path),
                    env: {
                        PGUSER: skitch_env_1.PGUSER,
                        PGPASSWORD: skitch_env_1.PGPASSWORD,
                        PGHOST: skitch_env_1.PGHOST,
                        PGPORT: skitch_env_1.PGPORT,
                        PATH: skitch_env_1.PATH
                    }
                });
                return [2 /*return*/, extensions];
        }
    });
}); };
//# sourceMappingURL=deploy.js.map