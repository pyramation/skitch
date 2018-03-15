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
var db_1 = require("../src/db");
var v4 = require('uuid/v4');
var pgPromise = require('pg-promise');
var pgp = pgPromise({
    noWarnings: true,
});
var utils_1 = require("./utils");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
describe('createdb', function () {
    var database = "testing-db-" + v4();
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.cleanup(database)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a database', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.createdb(utils_1.getConnObj({
                        database: database,
                    }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, utils_1.verifydb(database)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('templatedb', function () {
    var database = "testing-db-" + v4();
    var template = "testing-db-template-" + v4();
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.cleanup(database)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, utils_1.cleanup(template)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a templatedb database', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.createdb(utils_1.getConnObj({
                        database: template,
                    }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db_1.templatedb(utils_1.getConnObj({
                            database: database,
                            template: template,
                        }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, utils_1.verifydb(database)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('dropdb', function () {
    var database = "testing-db-" + v4();
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.createdb(utils_1.getConnObj({
                        database: database,
                    }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, utils_1.verifydb(database)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('drop a database', function () { return __awaiter(_this, void 0, void 0, function () {
        var failed, client, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failed = false;
                    return [4 /*yield*/, db_1.dropdb(utils_1.getConnObj({
                            database: database,
                        }))];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, pgp(utils_1.getConnStr({ database: database }))];
                case 3:
                    client = _a.sent();
                    return [4 /*yield*/, client.connect()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    failed = true;
                    return [3 /*break*/, 6];
                case 6:
                    expect(failed).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=db.test.js.map