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
var sqitch_1 = require("../src/sqitch");
var v4_1 = require("uuid/v4");
var index_1 = require("../index");
var pg_promise_1 = require("pg-promise");
var utils_1 = require("./utils");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
var pgp = pg_promise_1.default({
    noWarnings: true,
});
describe('sqitch', function () {
    var database;
    var opts;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    database = "testing-db-" + v4_1.default();
                    opts = __assign({ database: database }, utils_1.config);
                    return [4 /*yield*/, index_1.createdb(opts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.dropdb(opts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitch', function () { return __awaiter(_this, void 0, void 0, function () {
        var cn, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sqitch_1.sqitch(opts, __dirname + '/fixtures/basic')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pgp(opts)];
                case 2:
                    cn = _a.sent();
                    return [4 /*yield*/, cn.connect({ direct: true })];
                case 3:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 4:
                    _a.sent();
                    db.done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitch II', function () { return __awaiter(_this, void 0, void 0, function () {
        var dir, cn, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = process.cwd();
                    process.chdir(__dirname + '/fixtures/basic');
                    return [4 /*yield*/, sqitch_1.sqitch(opts)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pgp(opts)];
                case 2:
                    cn = _a.sent();
                    return [4 /*yield*/, cn.connect({ direct: true })];
                case 3:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 4:
                    _a.sent();
                    db.done();
                    process.chdir(dir);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitchFast', function () { return __awaiter(_this, void 0, void 0, function () {
        var cn, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sqitch_1.sqitchFast(opts, __dirname + '/fixtures/basic')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pgp(opts)];
                case 2:
                    cn = _a.sent();
                    return [4 /*yield*/, cn.connect({ direct: true })];
                case 3:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 4:
                    _a.sent();
                    db.done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitchFast II', function () { return __awaiter(_this, void 0, void 0, function () {
        var dir, cn, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = process.cwd();
                    process.chdir(__dirname + '/fixtures/basic');
                    return [4 /*yield*/, sqitch_1.sqitchFast(opts)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pgp(opts)];
                case 2:
                    cn = _a.sent();
                    return [4 /*yield*/, cn.connect({ direct: true })];
                case 3:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 4:
                    _a.sent();
                    db.done();
                    process.chdir(dir);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can setArgs', function () {
        expect(index_1.setArgs({ host: 'localhost' })).toEqual(['-h', 'localhost']);
    });
});
//# sourceMappingURL=utils.test.js.map