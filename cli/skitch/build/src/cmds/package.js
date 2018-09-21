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
var skitch_path_1 = require("skitch-path");
var parser = require('pgsql-parser');
// TODO move resolve to skitch-utils
var skitch_testing_1 = require("skitch-testing");
var skitch_transform_1 = require("skitch-transform");
var inquirerer_1 = require("inquirerer");
var fs_1 = require("fs");
var sluggify = function (text) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};
var noop = function () { return undefined; };
exports.cleanTree = function (tree) {
    return skitch_transform_1.transformProps(tree, {
        stmt_len: noop,
        stmt_location: noop,
        location: noop
    });
};
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var sql, sqitchPath, pkgPath, pkg, questions, version, extname, makePath, controlPath, sqlFileName, Makefile, control, regex, query, topLine, finalSql, tree1, tree2, diff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, skitch_testing_1.resolve()];
            case 1:
                sql = _a.sent();
                return [4 /*yield*/, skitch_path_1.default()];
            case 2:
                sqitchPath = _a.sent();
                pkgPath = sqitchPath + "/package.json";
                pkg = require(pkgPath);
                questions = [
                    {
                        name: 'version',
                        message: 'version',
                        default: pkg.version,
                        required: true,
                    }
                ];
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 3:
                version = (_a.sent()).version;
                extname = sluggify(pkg.name);
                makePath = sqitchPath + "/Makefile";
                controlPath = sqitchPath + "/" + extname + ".control";
                sqlFileName = extname + "--" + version + ".sql";
                Makefile = fs_1.readFileSync(makePath).toString();
                control = fs_1.readFileSync(controlPath).toString();
                // control file
                fs_1.writeFileSync(controlPath, control.replace(/default_version = '[0-9\.]+'/, "default_version = '" + version + "'"));
                // package json
                fs_1.writeFileSync(pkgPath, JSON.stringify(Object.assign({}, pkg, { version: version }), null, 2));
                regex = new RegExp(extname + '--[0-9\.]+.sql');
                fs_1.writeFileSync(makePath, Makefile.replace(regex, sqlFileName));
                // sql
                try {
                    query = parser.parse(sql).query.reduce(function (m, stmt) {
                        if (stmt.RawStmt.stmt.hasOwnProperty('TransactionStmt'))
                            return m;
                        if (stmt.RawStmt.stmt.hasOwnProperty('CreateExtensionStmt'))
                            return m;
                        return m.concat([stmt]);
                    }, []);
                    topLine = "\\echo Use \"CREATE EXTENSION " + extname + "\" to load this file. \\quit\n";
                    finalSql = parser.deparse(query);
                    fs_1.writeFileSync(sqitchPath + "/sql/" + sqlFileName, "" + topLine + finalSql);
                    tree1 = query;
                    tree2 = parser.parse(finalSql).query;
                    diff = (JSON.stringify(exports.cleanTree(tree1)) !== JSON.stringify(exports.cleanTree(tree2)));
                    if (diff) {
                        console.error('DIFF exists! Careful. Check sql/ folder...');
                        fs_1.writeFileSync(sqitchPath + "/sql/" + sqlFileName + ".tree.orig.json", JSON.stringify(exports.cleanTree(tree1), null, 2));
                        fs_1.writeFileSync(sqitchPath + "/sql/" + sqlFileName + ".tree.parsed.json", JSON.stringify(exports.cleanTree(tree2), null, 2));
                    }
                    console.log(sqlFileName + " written");
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=package.js.map