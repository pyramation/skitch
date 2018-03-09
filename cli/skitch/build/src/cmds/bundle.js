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
var child_process_1 = require("child_process");
var skitch_path_1 = require("skitch-path");
var promisify = require('util').promisify;
var fs = require('fs');
var mkdirp = require('mkdirp').sync;
var asyncExec = promisify(child_process_1.exec);
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);
var path = require('path');
var caseLib = require('case');
var questions = [
    {
        _: true,
        name: 'modulename',
        message: 'module',
        required: true,
    },
    {
        _: true,
        name: 'exportedname',
        message: 'exported name (usually same as modulename)',
        required: true,
    },
];
exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var PKGDIR, _a, modulename, exportedname;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, skitch_path_1.default()];
            case 1:
                PKGDIR = _b.sent();
                return [4 /*yield*/, inquirerer_1.prompt(questions, argv)];
            case 2:
                _a = _b.sent(), modulename = _a.modulename, exportedname = _a.exportedname;
                exportedname = caseLib.camel(exportedname);
                mkdirp(PKGDIR + "/modules");
                mkdirp(PKGDIR + "/deploy/schemas/v8/tables/modules/fixtures");
                mkdirp(PKGDIR + "/verify/schemas/v8/tables/modules/fixtures");
                mkdirp(PKGDIR + "/revert/schemas/v8/tables/modules/fixtures");
                console.log("browserify " + PKGDIR + "/node_modules/" + modulename + " --s " + exportedname + " -o modules/" + exportedname + ".bundle.js");
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var deployFile, revertFile, verifyFile, readStream, proc;
                    return __generator(this, function (_a) {
                        deployFile = fs.createWriteStream(PKGDIR + "/deploy/schemas/v8/tables/modules/fixtures/" + exportedname + ".sql");
                        revertFile = fs.createWriteStream(PKGDIR + "/revert/schemas/v8/tables/modules/fixtures/" + exportedname + ".sql");
                        verifyFile = fs.createWriteStream(PKGDIR + "/verify/schemas/v8/tables/modules/fixtures/" + exportedname + ".sql");
                        readStream = fs.createReadStream(PKGDIR + "/modules/" + name + ".bundle.js");
                        proc = child_process_1.exec("browserify " + PKGDIR + "/node_modules/" + modulename + " --s " + exportedname + " -o modules/" + exportedname + ".bundle.js");
                        // VERIFY
                        verifyFile.write("-- Verify schemas/v8/tables/modules/fixtures/" + exportedname + "  on pg\n\n  BEGIN;\n\n  SELECT 1/count(*) FROM v8.modules WHERE name='" + exportedname + "';\n\n  ROLLBACK;");
                        verifyFile.end();
                        // REVERT
                        revertFile.write("-- Revert schemas/v8/tables/modules/fixtures/" + exportedname + " from pg\n\n  BEGIN;\n\n  DELETE FROM v8.modules WHERE name='" + exportedname + "';\n\n  COMMIT;");
                        revertFile.end();
                        // DEPLOYMENT
                        deployFile.write("-- Deploy schemas/v8/tables/modules/fixtures/" + exportedname + " to pg\n\n  -- requires: schemas/v8/schema\n  -- requires: schemas/v8/tables/modules/table\n\n  BEGIN;\n\n  INSERT INTO v8.modules (name, code) VALUES ('" + exportedname + "', $code$\n\n    (function () {\n      var module = {\n        exports: { }\n      };\n      var exports = module.exports;\n\n      /* plv8 bundle begins */\n  ");
                        readStream.on('data', function (chunk) { });
                        readStream.on('end', function () {
                            deployFile.write("\n\n      /* plv8 bundle ends */\n\n      return module;\n    })();\n\n  $code$);\n\n  COMMIT;");
                            deployFile.end();
                        });
                        readStream.pipe(deployFile);
                        return [2 /*return*/];
                    });
                }); })();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=bundle.js.map