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
var index_1 = require("../index");
var utils_1 = require("./utils");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
var db;
describe('testing', function () {
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.closeTestDb(db)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('hot seed option', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                        hot: true,
                        directory: __dirname + '/fixtures/basic',
                    })];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('hot seed option prefix', function () { return __awaiter(_this, void 0, void 0, function () {
        var dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = process.cwd();
                    process.chdir(__dirname + '/fixtures/basic');
                    return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                            hot: true,
                            prefix: 'testing-another-',
                        })];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 2:
                    _a.sent();
                    process.chdir(dir);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitch seed option', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                        directory: __dirname + '/fixtures/basic',
                    })];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqitch seed option prefix', function () { return __awaiter(_this, void 0, void 0, function () {
        var dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = process.cwd();
                    process.chdir(__dirname + '/fixtures/basic');
                    return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                            prefix: 'testing-another-',
                        })];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(db)];
                case 2:
                    _a.sent();
                    process.chdir(dir);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('templatedb', function () {
    it('template option', function () { return __awaiter(_this, void 0, void 0, function () {
        var templatedb, connectionParameters, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                        hot: true,
                        directory: __dirname + '/fixtures/basic',
                    })];
                case 1:
                    templatedb = _b.sent();
                    return [4 /*yield*/, utils_1.expectBasicSeed(templatedb)];
                case 2:
                    _b.sent();
                    index_1.close(templatedb);
                    connectionParameters = templatedb.client.connectionParameters;
                    return [4 /*yield*/, index_1.connectTestDb(utils_1.config, {
                            template: connectionParameters.database,
                        })];
                case 3:
                    db = _b.sent();
                    // without inserting, expect data to be there already
                    _a = expect;
                    return [4 /*yield*/, db.any("SELECT * FROM myschema.sometable")];
                case 4:
                    // without inserting, expect data to be there already
                    _a.apply(void 0, [_b.sent()]).toEqual([
                        { id: 1, name: 'joe' },
                        { id: 2, name: 'steve' },
                        { id: 3, name: 'mary' },
                        { id: 4, name: 'rachel' },
                    ]);
                    return [4 /*yield*/, index_1.dropdb(connectionParameters)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, index_1.closeTestDb(db)];
                case 6:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=testing.test.js.map