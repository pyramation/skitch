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
var init_1 = require("../src/init");
var mkdirp_1 = require("mkdirp");
var glob_1 = require("glob");
var rimraf_1 = require("rimraf");
var TMPDIR = process.env.TMPDIR;
var rnd = function () {
    return Math.random()
        .toString(36)
        .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15);
};
describe('deps', function () {
    var dir, projDir;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = TMPDIR + '/' + rnd();
                    projDir = dir + '/myproject';
                    mkdirp_1.sync(projDir);
                    process.chdir(dir);
                    return [4 /*yield*/, init_1.initSkitch()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        rimraf_1.sync(dir);
    });
    describe('skitch path', function () {
        it('skitch init', function () { return __awaiter(_this, void 0, void 0, function () {
            var files, hidden;
            return __generator(this, function (_a) {
                process.chdir(dir);
                files = glob_1.sync('**');
                expect(files).toEqual([
                    'bootstrap-roles.sql',
                    'docker-compose.yml',
                    'Makefile',
                    'myproject',
                    'package.json',
                    'packages',
                    'packages/install.sh',
                    'readme.md',
                    'skitch.json'
                ]);
                hidden = glob_1.sync('.*');
                expect(hidden).toEqual(['.travis.yml']);
                return [2 /*return*/];
            });
        }); });
        it('sqitch init', function () { return __awaiter(_this, void 0, void 0, function () {
            var files, hidden;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process.chdir(projDir);
                        return [4 /*yield*/, init_1.init({
                                name: 'myproject',
                                description: 'my amazing project',
                                author: 'dan@example.com',
                                extensions: ['plpgsql', 'citext']
                            })];
                    case 1:
                        _a.sent();
                        files = glob_1.sync('**');
                        expect(files).toEqual([
                            'deploy',
                            'Makefile',
                            'myproject.control',
                            'package.json',
                            'revert',
                            'sqitch.conf',
                            'sqitch.plan',
                            'sql',
                            'test',
                            'test/utils',
                            'test/utils/index.js',
                            'verify'
                        ]);
                        hidden = glob_1.sync('.*');
                        expect(hidden).toEqual(['.babelrc', '.env']);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=init.test.js.map