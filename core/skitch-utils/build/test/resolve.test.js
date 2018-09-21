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
var resolve_1 = require("../src/resolve");
var expectResult = "-- Deploy schemas/myschema/schema to pg\n\nbegin;\n\ncreate schema myschema;\n\ncommit;\n\n-- Deploy schemas/myschema/tables/sometable/table to pg\n-- requires: schemas/myschema/schema\n\nbegin;\n\ncreate table myschema.sometable (\n  id serial,\n  name text\n);\n\ncommit;";
describe('resolve', function () {
    it('throws an error if file not found', function () { return __awaiter(_this, void 0, void 0, function () {
        var failed, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failed = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resolve_1.resolve(__dirname + '/fixtures/resolve/error-case')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(e_1.message).toEqual('no module schemas/myschema/somethingdoesntexist');
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    expect(failed).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error if circular reference found', function () { return __awaiter(_this, void 0, void 0, function () {
        var failed, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failed = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resolve_1.resolve(__dirname + '/fixtures/resolve/circular')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    expect(e_2.message).toEqual('Circular reference detected schemas/myschema/tables/sometable/table, schemas/myschema/schema');
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    expect(failed).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an error if invalid sql found', function () { return __awaiter(_this, void 0, void 0, function () {
        var failed, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failed = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resolve_1.resolve(__dirname + '/fixtures/resolve/invalid')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    expect(e_3.message).toEqual('deployment script in wrong place or is named wrong internally-- Deploy schemas/notmyschema/schema to pg,schemas/notmyschema/schema');
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    expect(failed).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolves sql in proper order', function () { return __awaiter(_this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, resolve_1.resolve(__dirname + '/fixtures/resolve/basic')];
                case 1:
                    sql = _a.sent();
                    expect(sql).toBeTruthy();
                    expect(sql.trim()).toEqual(expectResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('resolves sql in proper order using cwd()', function () { return __awaiter(_this, void 0, void 0, function () {
        var dir, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = process.cwd();
                    process.chdir(__dirname + '/fixtures/resolve/basic');
                    return [4 /*yield*/, resolve_1.resolve()];
                case 1:
                    sql = _a.sent();
                    expect(sql).toBeTruthy();
                    expect(sql.trim()).toEqual(expectResult);
                    process.chdir(dir);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=resolve.test.js.map