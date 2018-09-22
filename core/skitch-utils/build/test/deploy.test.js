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
process.env.SKITCH_PATH = __dirname + '/fixtures/skitch';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
var util_1 = require("util");
var child_process_1 = require("child_process");
var asyncExec = util_1.promisify(child_process_1.exec);
var skitch_env_1 = require("skitch-env");
var index_1 = require("../index");
var database = 'my-test-module-db';
var pg = require('pg');
var pgPool;
describe('deploy sqitch modules', function () {
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgPool = new pg.Pool({
                        connectionString: "postgres://" + skitch_env_1.PGUSER + ":" + skitch_env_1.PGPASSWORD + "@" + skitch_env_1.PGHOST + ":" + skitch_env_1.PGPORT + "/" + database
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, asyncExec("dropdb -U " + skitch_env_1.PGUSER + " -h " + skitch_env_1.PGHOST + " -p " + skitch_env_1.PGPORT + " " + database, {
                            env: {
                                PGPASSWORD: skitch_env_1.PGPASSWORD,
                                PATH: skitch_env_1.PATH
                            }
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, asyncExec("createdb -U " + skitch_env_1.PGUSER + " -h " + skitch_env_1.PGHOST + " -p " + skitch_env_1.PGPORT + " " + database, {
                        env: {
                            PGPASSWORD: skitch_env_1.PGPASSWORD,
                            PATH: skitch_env_1.PATH
                        }
                    })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgPool.end();
                    return [4 /*yield*/, asyncExec("dropdb -U " + skitch_env_1.PGUSER + " -h " + skitch_env_1.PGHOST + " -p " + skitch_env_1.PGPORT + " " + database, {
                            env: {
                                PGPASSWORD: skitch_env_1.PGPASSWORD,
                                PATH: skitch_env_1.PATH
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('deploy', function () { return __awaiter(_this, void 0, void 0, function () {
        var utils, secret, secret2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.deploy('secrets', database)];
                case 1:
                    utils = _a.sent();
                    return [4 /*yield*/, pgPool.query('SELECT * FROM generate_secret()')];
                case 2:
                    secret = (_a.sent()).rows[0].generate_secret;
                    return [4 /*yield*/, pgPool.query('SELECT * FROM secretfunction()')];
                case 3:
                    secret2 = (_a.sent()).rows[0].secretfunction;
                    expect(secret).toBeTruthy();
                    expect(secret2).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('revert', function () { return __awaiter(_this, void 0, void 0, function () {
        var deployUtils, secret, secret2, failed, revertUtils, secret3, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.deploy('secrets', database)];
                case 1:
                    deployUtils = _a.sent();
                    return [4 /*yield*/, pgPool.query('SELECT * FROM generate_secret()')];
                case 2:
                    secret = (_a.sent()).rows[0].generate_secret;
                    return [4 /*yield*/, pgPool.query('SELECT * FROM secretfunction()')];
                case 3:
                    secret2 = (_a.sent()).rows[0].secretfunction;
                    expect(secret).toBeTruthy();
                    expect(secret2).toBeTruthy();
                    failed = false;
                    return [4 /*yield*/, index_1.revert('secrets', database)];
                case 4:
                    revertUtils = _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, pgPool.query('SELECT * FROM generate_secret()')];
                case 6:
                    secret3 = (_a.sent()).rows[0].generate_secret;
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    failed = true;
                    return [3 /*break*/, 8];
                case 8:
                    expect(failed).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('verify', function () { return __awaiter(_this, void 0, void 0, function () {
        var deployUtils, secret, secret2, failed, revertUtils, secret3, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.deploy('secrets', database)];
                case 1:
                    deployUtils = _a.sent();
                    // verify
                    return [4 /*yield*/, index_1.verify('secrets', database)];
                case 2:
                    // verify
                    _a.sent();
                    return [4 /*yield*/, pgPool.query('SELECT * FROM generate_secret()')];
                case 3:
                    secret = (_a.sent()).rows[0].generate_secret;
                    return [4 /*yield*/, pgPool.query('SELECT * FROM secretfunction()')];
                case 4:
                    secret2 = (_a.sent()).rows[0].secretfunction;
                    expect(secret).toBeTruthy();
                    expect(secret2).toBeTruthy();
                    failed = false;
                    return [4 /*yield*/, index_1.revert('secrets', database)];
                case 5:
                    revertUtils = _a.sent();
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, pgPool.query('SELECT * FROM generate_secret()')];
                case 7:
                    secret3 = (_a.sent()).rows[0].generate_secret;
                    return [3 /*break*/, 9];
                case 8:
                    e_3 = _a.sent();
                    failed = true;
                    return [3 /*break*/, 9];
                case 9:
                    expect(failed).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=deploy.test.js.map