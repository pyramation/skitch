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
var paths_1 = require("./paths");
var parser = require('pgsql-parser');
var resolve_1 = require("./resolve");
var mkdirp_1 = require("mkdirp");
var path_1 = require("path");
var skitch_transform_1 = require("skitch-transform");
var fs_1 = require("fs");
var utils_1 = require("./utils");
var noop = function () { return undefined; };
exports.cleanTree = function (tree) {
    return skitch_transform_1.transformProps(tree, {
        stmt_len: noop,
        stmt_location: noop,
        location: noop
    });
};
exports.packageModule = function (extension) {
    if (extension === void 0) { extension = true; }
    return __awaiter(_this, void 0, void 0, function () {
        var sqitchPath, sql, pkgPath, pkg, extname, query, topLine, finalSql, tree1, tree2, results, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paths_1.sqitchPath()];
                case 1:
                    sqitchPath = _a.sent();
                    return [4 /*yield*/, resolve_1.resolve(sqitchPath)];
                case 2:
                    sql = _a.sent();
                    pkgPath = sqitchPath + "/package.json";
                    pkg = require(pkgPath);
                    extname = utils_1.sluggify(pkg.name);
                    // sql
                    try {
                        query = parser.parse(sql).query.reduce(function (m, stmt) {
                            if (extension) {
                                if (stmt.RawStmt.stmt.hasOwnProperty('TransactionStmt'))
                                    return m;
                                if (stmt.RawStmt.stmt.hasOwnProperty('CreateExtensionStmt'))
                                    return m;
                            }
                            return m.concat([stmt]);
                        }, []);
                        topLine = extension ? "\\echo Use \"CREATE EXTENSION " + extname + "\" to load this file. \\quit\n" : '';
                        finalSql = parser.deparse(query);
                        tree1 = query;
                        tree2 = parser.parse(finalSql).query;
                        results = {
                            sql: "" + topLine + finalSql
                        };
                        diff = (JSON.stringify(exports.cleanTree(tree1)) !== JSON.stringify(exports.cleanTree(tree2)));
                        if (diff) {
                            results.diff = true;
                            results.tree1 = JSON.stringify(exports.cleanTree(tree1), null, 2);
                            results.tree2 = JSON.stringify(exports.cleanTree(tree2), null, 2);
                        }
                        return [2 /*return*/, results];
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.writePackage = function (version, extension) {
    if (extension === void 0) { extension = true; }
    return __awaiter(_this, void 0, void 0, function () {
        var sqitchPath, pkgPath, pkg, extname, makePath, controlPath, sqlFileName, Makefile, control, _a, sql, diff, tree1, tree2, outPath, regex, writePath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, paths_1.sqitchPath()];
                case 1:
                    sqitchPath = _b.sent();
                    pkgPath = sqitchPath + "/package.json";
                    pkg = require(pkgPath);
                    extname = utils_1.sluggify(pkg.name);
                    makePath = sqitchPath + "/Makefile";
                    controlPath = sqitchPath + "/" + extname + ".control";
                    sqlFileName = extname + "--" + version + ".sql";
                    Makefile = fs_1.readFileSync(makePath).toString();
                    control = fs_1.readFileSync(controlPath).toString();
                    return [4 /*yield*/, exports.packageModule(extension)];
                case 2:
                    _a = _b.sent(), sql = _a.sql, diff = _a.diff, tree1 = _a.tree1, tree2 = _a.tree2;
                    outPath = extension ? sqitchPath + "/sql" : sqitchPath + "/out";
                    mkdirp_1.sync(outPath);
                    if (extension) {
                        // control file
                        fs_1.writeFileSync(controlPath, control.replace(/default_version = '[0-9\.]+'/, "default_version = '" + version + "'"));
                        // package json
                        fs_1.writeFileSync(pkgPath, JSON.stringify(Object.assign({}, pkg, { version: version }), null, 2));
                        regex = new RegExp(extname + '--[0-9.]+.sql');
                        fs_1.writeFileSync(makePath, Makefile.replace(regex, sqlFileName));
                    }
                    if (diff) {
                        console.error("DIFF exists! Careful. Check " + path_1.relative(sqitchPath, outPath) + "/ folder...");
                        fs_1.writeFileSync(outPath + "/orig." + sqlFileName + ".tree.json", tree1);
                        fs_1.writeFileSync(outPath + "/parsed." + sqlFileName + ".tree.json", tree2);
                    }
                    writePath = outPath + "/" + sqlFileName;
                    fs_1.writeFileSync(writePath, sql);
                    console.log(path_1.relative(sqitchPath, writePath) + " written");
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=package.js.map