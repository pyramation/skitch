#!/usr/bin/env node
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
var inquirerer_1 = require("inquirerer");
var skitch_path_1 = require("skitch-path");
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp').sync;
var promisify = require('util').promisify;
var glob = promisify(require('glob'));
var exec = require('child_process').exec;
var asyncExec = promisify(exec);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var questions = [
    {
        _: true,
        name: 'filter',
        message: 'choose a filter, e.g, schemas/users',
        required: true,
    },
];
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    function sanitize_path(fullpath) {
        function constructPath(pathArray) {
            return pathArray.length ? pathArray.join('/') : '';
        }
        // TODO: NOT DRY
        function createPathArray(str) {
            return str.split('/').filter(function (f) { return f; });
        }
        return constructPath(createPathArray(fullpath));
    }
    var PKGDIR, filter, files, i, data, stdout;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, skitch_path_1.default()];
            case 1:
                PKGDIR = _a.sent();
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 2:
                filter = (_a.sent()).filter;
                filter = sanitize_path(filter);
                return [4 /*yield*/, glob(PKGDIR + "/**/**.sql")];
            case 3:
                files = _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < files.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, readFile(files[i])];
            case 5:
                data = _a.sent();
                if (!files[i].match(filter))
                    return [3 /*break*/, 8];
                if (!!/plv8/.test(data)) return [3 /*break*/, 8];
                return [4 /*yield*/, asyncExec("pg_format " + files[i])];
            case 6:
                stdout = (_a.sent()).stdout;
                return [4 /*yield*/, writeFile(files[i], stdout)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 4];
            case 9: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=format.js.map