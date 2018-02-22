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
        define(["require", "exports", "fuzzy", "child_process", "./schemas", "./changes", "./requires"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var fuzzy_1 = require("fuzzy");
    var child_process_1 = require("child_process");
    var inquirer = require('inquirer');
    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
    var argv = require('minimist')(process.argv.slice(2));
    var schemas_1 = require("./schemas");
    var changes_1 = require("./changes");
    var requires_1 = require("./requires");
    exports.searchTemplates = function (answers, input) {
        input = input || '';
        return new Promise(function (resolve) {
            setTimeout(function () {
                var fuzzyResult = fuzzy_1.default.filter(input, Object.keys(schemas_1.default));
                resolve(fuzzyResult.map(function (el) {
                    return el.original;
                }));
            }, 25);
        });
    };
    exports.skitch = function () { return __awaiter(_this, void 0, void 0, function () {
        var _, body, template, answer, questions, override, answers, result, params, vars, change, reqd, reqs, cmd, sqitch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _ = argv._, body = __rest(argv, ["_"]);
                    if (!!argv._.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: 'autocomplete',
                                name: 'template',
                                message: 'what do you want to create?',
                                source: exports.searchTemplates,
                            },
                        ])];
                case 1:
                    answer = _a.sent();
                    template = answer.template;
                    return [3 /*break*/, 3];
                case 2:
                    template = _[0];
                    _a.label = 3;
                case 3:
                    if (!schemas_1.default.hasOwnProperty(template)) {
                        throw new Error(template + " does not exist!");
                    }
                    questions = schemas_1.default[template];
                    override = {};
                    Object.keys(body).forEach(function (param) {
                        questions = questions.filter(function (question) {
                            if (question.name === param) {
                                override[param] = body[param];
                                return false;
                            }
                            return question;
                        });
                    });
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 4:
                    answers = _a.sent();
                    result = Object.assign({}, answers, override);
                    params = Object.keys(result).reduce(function (m, v) {
                        if (result[v] instanceof Array) {
                            m.push({
                                key: "arr__" + v,
                                value: result[v].join(','),
                            });
                            // cannot detect arrays, so for elements of 1, need to tell template it is not an array for elements of one
                            if (result[v].length > 1) {
                                m.push({
                                    key: v + "__is_array",
                                    value: true,
                                });
                            }
                            result[v].forEach(function (value) {
                                m.push({
                                    key: v,
                                    value: value,
                                });
                            });
                        }
                        else {
                            if (typeof result[v] === 'boolean' && !result[v]) {
                                return m;
                            }
                            m.push({
                                key: v,
                                value: result[v],
                            });
                        }
                        return m;
                    }, []);
                    vars = params.map(function (obj) { return "--set " + obj.key + "=\"" + obj.value + "\""; }).join(' ');
                    change = changes_1.default[template](result);
                    reqd = [];
                    reqs = requires_1.default[template](result)
                        .filter(function (req) {
                        if (reqd.includes(req.join('/'))) {
                            return false;
                        }
                        reqd.push(req.join('/'));
                        return true;
                    })
                        .map(function (req) {
                        return "-r " + req.join('/');
                    })
                        .join(' ');
                    change = change.join('/');
                    if (!change || change === '' || change === '/') {
                        throw new Error('no change found!');
                    }
                    cmd = "\n  sqitch add " + change + " --template " + template + " -n 'add " + change + "' " + vars + " " + reqs + "\n  ";
                    console.log(cmd);
                    sqitch = child_process_1.exec(cmd.trim());
                    sqitch.stdout.pipe(process.stdout);
                    sqitch.stderr.pipe(process.stderr);
                    return [2 /*return*/];
            }
        });
    }); };
});
//# sourceMappingURL=skitch.js.map