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
var shelljs_1 = require("shelljs");
var inquirerer_1 = require("inquirerer");
var skitch_utils_1 = require("skitch-utils");
var path_1 = require("path");
// sqitch init flipr --uri https://github.com/theory/sqitch-intro/ --engine pg
var username = shelljs_1.exec('git config --global user.name', { silent: true }).trim();
var email = shelljs_1.exec('git config --global user.email', { silent: true }).trim();
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var modules, questions, _a, name, description, author, extensions;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!argv.bare) return [3 /*break*/, 2];
                return [4 /*yield*/, skitch_utils_1.initSkitch()];
            case 1:
                _b.sent();
                console.log("\n\n          |||\n         (o o)\n     ooO--(_)--Ooo-\n\n\n  \u2728 Great work! Now, try this:\n\n  cd packages/\n  mkdir myfirstmodule\n  cd myfirstmodule/\n  skitch init\n  ");
                return [2 /*return*/];
            case 2: return [4 /*yield*/, skitch_utils_1.skitchPath()];
            case 3:
                _b.sent();
                return [4 /*yield*/, skitch_utils_1.getAvailableExtensions()];
            case 4:
                modules = _b.sent();
                questions = [
                    {
                        name: 'name',
                        message: 'project name (e.g., flipr)',
                        default: path_1.basename(process.cwd()),
                        required: true
                    },
                    {
                        name: 'author',
                        message: 'project author',
                        default: username + " <" + email + ">",
                        required: true
                    },
                    {
                        name: 'description',
                        message: 'project description',
                        default: 'skitch project',
                        required: true
                    },
                    {
                        name: 'extensions',
                        message: 'which extensions?',
                        choices: modules,
                        type: 'checkbox',
                        default: ['plpgsql'],
                        required: true
                    }
                ];
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 5:
                _a = _b.sent(), name = _a.name, description = _a.description, author = _a.author, extensions = _a.extensions;
                return [4 /*yield*/, skitch_utils_1.init({ name: name, description: description, author: author, extensions: extensions })];
            case 6:
                _b.sent();
                console.log("\n\n        |||\n       (o o)\n   ooO--(_)--Ooo-\n\n\n\u2728 " + name + " created!\n\nNow try this:\n\nskitch generate\n\n");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=init.js.map