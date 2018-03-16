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
var v4 = require('uuid/v4');
var db_1 = require("./db");
var seed_1 = require("./seed");
var skitch_path_1 = require("skitch-path");
var connection_1 = require("./connection");
var path_1 = require("path");
exports.getOpts = function (configOpts) { return __awaiter(_this, void 0, void 0, function () {
    var _a, PGUSER, PGPASSWORD, PGPORT, PGHOST, FAST_TEST, _b, user, _c, password, _d, port, _e, host, _f, hot, template, _g, prefix, directory;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = process.env, PGUSER = _a.PGUSER, PGPASSWORD = _a.PGPASSWORD, PGPORT = _a.PGPORT, PGHOST = _a.PGHOST, FAST_TEST = _a.FAST_TEST;
                configOpts = configOpts || {};
                _b = configOpts.user, user = _b === void 0 ? PGUSER : _b, _c = configOpts.password, password = _c === void 0 ? PGPASSWORD : _c, _d = configOpts.port, port = _d === void 0 ? PGPORT : _d, _e = configOpts.host, host = _e === void 0 ? PGHOST : _e, _f = configOpts.hot, hot = _f === void 0 ? FAST_TEST : _f, template = configOpts.template, _g = configOpts.prefix, prefix = _g === void 0 ? 'testing-db' : _g, directory = configOpts.directory;
                if (!(!directory && !template)) return [3 /*break*/, 2];
                return [4 /*yield*/, skitch_path_1.default()];
            case 1:
                directory = _h.sent();
                return [3 /*break*/, 3];
            case 2:
                if (directory) {
                    directory = path_1.resolve(directory);
                }
                _h.label = 3;
            case 3: return [2 /*return*/, {
                    user: user,
                    password: password,
                    port: port,
                    host: host,
                    hot: hot,
                    template: template,
                    prefix: prefix,
                    directory: directory,
                }];
        }
    });
}); };
exports.getConnection = function (configOpts, database) { return __awaiter(_this, void 0, void 0, function () {
    var user, password, port, host, hot, template, prefix, directory, connection, db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getOpts(configOpts)];
            case 1:
                configOpts = _a.sent();
                user = configOpts.user, password = configOpts.password, port = configOpts.port, host = configOpts.host, hot = configOpts.hot, template = configOpts.template, prefix = configOpts.prefix, directory = configOpts.directory;
                if (!database) {
                    database = prefix + "-" + v4();
                }
                connection = {
                    database: database,
                    user: user,
                    port: port,
                    password: password,
                    host: host,
                };
                if (!hot) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.createdb(connection)];
            case 2:
                _a.sent();
                return [4 /*yield*/, seed_1.hotSeed(connection, directory)];
            case 3:
                _a.sent();
                return [3 /*break*/, 9];
            case 4:
                if (!template) return [3 /*break*/, 6];
                return [4 /*yield*/, db_1.templatedb(__assign({}, connection, { template: template }))];
            case 5:
                _a.sent();
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, db_1.createdb(connection)];
            case 7:
                _a.sent();
                return [4 /*yield*/, seed_1.seed(connection, directory)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, connection_1.connect(connection)];
            case 10:
                db = _a.sent();
                return [2 /*return*/, db];
        }
    });
}); };
exports.closeConnection = function (db) { return __awaiter(_this, void 0, void 0, function () {
    var connectionParameters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connectionParameters = db.client.connectionParameters;
                connection_1.close(db);
                return [4 /*yield*/, db_1.dropdb(connectionParameters)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.truncateTables = function (db) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.any("SELECT truncate_tables(ARRAY['v8'])")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=testing.js.map