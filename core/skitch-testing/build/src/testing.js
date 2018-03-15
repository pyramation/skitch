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
var v4_1 = require("uuid/v4");
var db_1 = require("./db");
var seed_1 = require("./seed");
var connection_1 = require("./connection");
exports.connectTestDb = function (config, _a) {
    var hot = _a.hot, template = _a.template, _b = _a.prefix, prefix = _b === void 0 ? 'testing-db' : _b, _c = _a.directory, directory = _c === void 0 ? process.cwd() : _c;
    return __awaiter(_this, void 0, void 0, function () {
        var database, connection, db;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    database = prefix + "-" + v4_1.default();
                    connection = Object.assign({
                        database: database
                    }, config);
                    if (!hot) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.createdb(connection)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, seed_1.hotSeed(connection, directory)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 8];
                case 3:
                    if (!template) return [3 /*break*/, 5];
                    return [4 /*yield*/, db_1.templatedb(__assign({}, connection, { template: template }))];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, db_1.createdb(connection)];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, seed_1.seed(connection, directory)];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8: return [4 /*yield*/, connection_1.connect(connection)];
                case 9:
                    db = _d.sent();
                    return [2 /*return*/, db];
            }
        });
    });
};
exports.closeTestDb = function (db) { return __awaiter(_this, void 0, void 0, function () {
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
//# sourceMappingURL=testing.js.map