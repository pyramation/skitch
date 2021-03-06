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
var skitch_utils_1 = require("skitch-utils");
var shell = require("shelljs");
var glob = require('glob').sync;
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp').sync;
var questions = [
    {
        _: true,
        name: 'src',
        message: 'src',
        required: true,
    },
    {
        _: true,
        name: 'dst',
        message: 'dst',
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
    var PKGDIR, _a, src, dst, files, dirs, ops;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, skitch_utils_1.sqitchPath()];
            case 1:
                PKGDIR = _b.sent();
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 2:
                _a = _b.sent(), src = _a.src, dst = _a.dst;
                src = sanitize_path(src);
                dst = sanitize_path(dst);
                files = glob(PKGDIR + "/**/**.sql");
                files.forEach(function (file) {
                    var contents = fs.readFileSync(file).toString();
                    if (contents.match(src)) {
                        var regexp = new RegExp(src.replace(/\//g, '/'), 'g');
                        fs.writeFileSync(file, contents.replace(regexp, dst));
                    }
                });
                dirs = {};
                ops = [];
                files.filter(function (f) { return f.match(src); }).forEach(function (file) {
                    var parts = file.split(src);
                    var newpath = path.resolve(parts[0] + "/" + dst + "/" + parts[1]);
                    var dirname = newpath.replace(/\/[^\/]*$/, '');
                    dirs[dirname] = dirname;
                    ops.push([file, file.replace(src, dst)]);
                });
                Object.keys(dirs).forEach(function (dirkey) {
                    mkdirp(dirs[dirkey]);
                });
                ops.forEach(function (_a) {
                    var src = _a[0], dst = _a[1];
                    fs.renameSync(src, dst);
                });
                shell.exec("find . -type d -empty -delete");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=rename.js.map