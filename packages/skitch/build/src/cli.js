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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fuzzy", "skitch-prompt", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var fuzzy_1 = require("fuzzy");
    var skitch_prompt_1 = require("skitch-prompt");
    var index_1 = require("./index");
    exports.searchCmds = function (answers, input) {
        input = input || '';
        return new Promise(function (resolve) {
            setTimeout(function () {
                var fuzzyResult = fuzzy_1.filter(input, Object.keys(index_1.default));
                resolve(fuzzyResult.map(function (el) {
                    return el.original;
                }));
            }, 25);
        });
    };
    exports.skitch = function (argv) { return __awaiter(_this, void 0, void 0, function () {
        var _, body, cmd, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _ = argv._, body = __rest(argv, ["_"]);
                    if (!!argv._.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, skitch_prompt_1.prompt([
                            {
                                type: 'autocomplete',
                                name: 'cmd',
                                message: 'what do you want to do?',
                                source: exports.searchCmds,
                            },
                        ], {})];
                case 1:
                    answer = _a.sent();
                    cmd = answer.cmd;
                    return [3 /*break*/, 3];
                case 2:
                    cmd = _.shift();
                    _a.label = 3;
                case 3:
                    if (!index_1.default.hasOwnProperty(cmd)) {
                        throw new Error(cmd + " does not exist!");
                    }
                    return [4 /*yield*/, index_1.default[cmd](argv)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
});
//# sourceMappingURL=cli.js.map