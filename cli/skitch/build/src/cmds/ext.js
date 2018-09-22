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
require("skitch-template");
var mkdirp_1 = require("mkdirp");
var inquirerer_1 = require("inquirerer");
var glob_1 = require("glob");
var skitch_utils_1 = require("skitch-utils");
var fs_1 = require("fs");
var plan_1 = require("./plan");
var questions = [
    {
        name: 'extname',
        message: 'extension name (e.g., app-extensions)',
        default: 'app-extensions',
        required: true,
    },
    {
        name: 'projects',
        type: 'confirm',
        message: 'use sibling sqitch projects?',
        required: true,
    },
];
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var sqitchPath, _a, extname, projects, controlFile, envFile, extensions, envs, note, output, pkg;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, skitch_utils_1.sqitchPath()];
            case 1:
                sqitchPath = _b.sent();
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 2:
                _a = _b.sent(), extname = _a.extname, projects = _a.projects;
                controlFile = glob_1.sync(sqitchPath + "/*.control");
                envFile = glob_1.sync(sqitchPath + "/.env");
                if (!controlFile || !controlFile.length) {
                    throw new Error('no control file found!');
                }
                if (!envFile || !envFile.length) {
                    throw new Error('no control file found!');
                }
                try {
                    extensions = fs_1.readFileSync(controlFile[0]).toString().split('\n').find(function (line) { return line.match(/^requires/); }).split('=')[1].split("'")[1].split(',').map(function (a) { return a.trim(); });
                }
                catch (e) {
                    throw new Error('missing requires from control files or bad syntax');
                }
                try {
                    envs = fs_1.readFileSync(envFile[0]).toString().split('\n').reduce(function (m, line) {
                        line = (line || '').trim();
                        if (/^#/.test(line))
                            return m;
                        if (!line.length)
                            return m;
                        var parts = line.split('=');
                        console.log(parts);
                        m[parts[0].trim()] = parts[1].trim();
                        return m;
                    }, {});
                }
                catch (e) {
                    console.error(e);
                    throw new Error('missing env files or bad syntax');
                }
                if (projects) {
                    envs.PGEXTENSIONS = extensions.join(',');
                    fs_1.writeFileSync(envFile[0], Object.keys(envs).reduce(function (m, key) {
                        var value = envs[key];
                        m = m + "\n" + key + "=" + value;
                        return m;
                    }, ''));
                    return [2 /*return*/];
                }
                note = '-- NOTE: this is generated by skitch, extensions are not actually bundled in final output, just used for testing';
                output = {
                    deploy: [note],
                    revert: [note],
                    verify: [note],
                };
                // DEPLOY
                output.deploy.push("-- Deploy extensions/" + extname + " to pg");
                output.deploy.push('BEGIN;\n');
                extensions.forEach(function (ext) {
                    output.deploy.push("CREATE EXTENSION IF NOT EXISTS \"" + ext + "\" CASCADE;");
                });
                output.deploy.push('\nCOMMIT;');
                // REVERT
                output.revert.push("-- Revert extensions/" + extname + " from pg");
                output.revert.push('BEGIN;\n');
                extensions.reverse().forEach(function (ext) {
                    // certain extensions let us not drop, thanks
                    if (ext === 'uuid-ossp')
                        return;
                    if (ext === 'plpgsql')
                        return;
                    output.revert.push("DROP EXTENSION IF EXISTS \"" + ext + "\";");
                });
                output.revert.push('\nCOMMIT;');
                // VERIFY
                output.verify.push("-- Verify extensions/" + extname + " on pg");
                output.verify.push('BEGIN;\n');
                extensions.forEach(function (ext) {
                    output.verify.push("SELECT verify_extension('" + ext + "');");
                });
                output.verify.push('\nROLLBACK;');
                if (others) {
                }
                Object.keys(output).forEach(function (type) {
                    mkdirp_1.sync(sqitchPath + "/" + type + "/extensions");
                    fs_1.writeFileSync(sqitchPath + "/" + type + "/extensions/" + extname + ".sql", output[type].join('\n'));
                });
                pkg = require(sqitchPath + "/package.json");
                return [4 /*yield*/, plan_1.default({ name: pkg.name })];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=ext.js.map