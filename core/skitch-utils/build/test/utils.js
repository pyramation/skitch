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
Object.defineProperty(exports, "__esModule", { value: true });
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
require('dotenv').load();
var index_1 = require("../index");
var pg_promise_1 = require("pg-promise");
var pgp = pg_promise_1.default({
    noWarnings: true,
});
var _a = process.env, PGHOST = _a.PGHOST, PGPASSWORD = _a.PGPASSWORD, PGPORT = _a.PGPORT, PGUSER = _a.PGUSER;
exports.getConnObj = function (config) {
    if (config === void 0) { config = {}; }
    if (!config.host) {
        config.host = PGHOST;
    }
    if (!config.password) {
        config.password = PGPASSWORD;
    }
    if (!config.user) {
        config.user = PGUSER;
    }
    if (!config.port && PGPORT) {
        config.port = parseInt(PGPORT, 10);
    }
    if (!config.port || !config.user || !config.host) {
        throw new Error('db config NEEDS info!');
    }
    return config;
};
exports.config = exports.getConnObj();
exports.getConnStr = function (config) {
    return index_1.connectionString(exports.getConnObj(config));
};
function cleanup(database) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pgp(exports.getConnObj({ database: 'postgres' }))];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.connect({ direct: true })];
                case 2:
                    db = _a.sent();
                    return [4 /*yield*/, db.any("DROP DATABASE \"" + database + "\"")];
                case 3:
                    _a.sent();
                    db.done();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cleanup = cleanup;
function verifydb(database) {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, type;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pgp(exports.getConnObj({ database: database }))];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.connect({ direct: true })];
                case 2:
                    db = _a.sent();
                    return [4 /*yield*/, db.one("SELECT * FROM pg_type LIMIT 1")];
                case 3:
                    type = _a.sent();
                    expect(type).toBeTruthy();
                    db.done();
                    return [2 /*return*/];
            }
        });
    });
}
exports.verifydb = verifydb;
function expectBasicSeed(db) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db.any("INSERT INTO myschema.sometable (name) VALUES ('joe'), ('steve'), ('mary'), ('rachel');")];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, db.any("SELECT * FROM myschema.sometable")];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toEqual([
                        { id: 1, name: 'joe' },
                        { id: 2, name: 'steve' },
                        { id: 3, name: 'mary' },
                        { id: 4, name: 'rachel' },
                    ]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.expectBasicSeed = expectBasicSeed;
//# sourceMappingURL=utils.js.map