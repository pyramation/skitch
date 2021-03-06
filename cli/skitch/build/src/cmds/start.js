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
var util_1 = require("util");
var inquirerer_1 = require("inquirerer");
var skitch_utils_1 = require("skitch-utils");
var shell = require("shelljs");
var skitch_env_1 = require("skitch-env");
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var path, questions, _a, _b, _c, schemas, db, cmd;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, skitch_utils_1.sqitchPath()];
            case 1:
                path = _d.sent();
                _a = [{
                        name: 'db',
                        message: 'database',
                        required: true,
                    }];
                _b = {
                    type: 'checkbox',
                    name: 'schemas',
                    message: 'choose schemas'
                };
                return [4 /*yield*/, util_1.promisify(fs_1.readdir)(path_1.resolve(path + '/deploy/schemas'))];
            case 2:
                questions = _a.concat([
                    (_b.choices = _d.sent(),
                        _b.required = true,
                        _b)
                ]);
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 3:
                _c = _d.sent(), schemas = _c.schemas, db = _c.db;
                cmd = [
                    'postgraphile',
                    '--connection',
                    "postgres://" + skitch_env_1.default.PGUSER + ":" + skitch_env_1.default.PGPASSWORD + "@" + skitch_env_1.default.PGHOST + ":" + skitch_env_1.default.PGPORT + "/" + db,
                    '--schema',
                    schemas.join(','),
                ].join(' ');
                shell.exec(cmd);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=start.js.map