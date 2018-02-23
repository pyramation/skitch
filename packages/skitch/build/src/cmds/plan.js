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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "child_process", "skitch-path"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var child_process_1 = require("child_process");
    var skitch_path_1 = require("skitch-path");
    var promisify = require('util').promisify;
    var fs = require('fs');
    var glob = promisify(require('glob'));
    var asyncExec = promisify(child_process_1.exec);
    var readFile = promisify(fs.readFile);
    var writeFile = promisify(fs.writeFile);
    exports.default = (function (argv) { return __awaiter(_this, void 0, void 0, function () {
        // TODO make a class that uses paths instead of some.sql
        // https://www.electricmonk.nl/log/2008/08/07/dependency-resolving-algorithm/
        function dep_resolve(sqlmodule, resolved, unresolved) {
            unresolved.push(sqlmodule);
            var edges = deps['/deploy/' + sqlmodule + '.sql'];
            if (!edges) {
                throw new Error("no module " + sqlmodule);
            }
            for (var i = 0; i < edges.length; i++) {
                var dep = edges[i];
                if (!resolved.includes(dep)) {
                    if (unresolved.includes(dep)) {
                        throw new Error("Circular reference detected " + sqlmodule + ", " + dep);
                    }
                    dep_resolve(dep, resolved, unresolved);
                }
            }
            resolved.push(sqlmodule);
            var index = unresolved.indexOf(sqlmodule);
            unresolved.splice(index);
        }
        var PKGDIR, now, planfile, deps, reg, files, i, data, lines, key, j, m, m2, resolved, unresolved, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, skitch_path_1.default()];
                case 1:
                    PKGDIR = _a.sent();
                    now = '2017-08-11T08:11:51Z';
                    planfile = [];
                    deps = {};
                    reg = {};
                    return [4 /*yield*/, glob("/" + skitch_path_1.default + "/deploy/**/**.sql")];
                case 2:
                    files = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < files.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, readFile(files[i])];
                case 4:
                    data = _a.sent();
                    lines = data.toString().split('\n');
                    key = files[i].split(PKGDIR)[1];
                    deps[key] = [];
                    reg[key] = [];
                    for (j = 0; j < lines.length; j++) {
                        m = lines[j].match(/-- requires: (.*)/);
                        if (m) {
                            deps[key].push(m[1].trim());
                        }
                        m2 = lines[j].match(/-- Deploy (.*) to pg/);
                        if (m2) {
                            if (key != "/deploy/" + m2[1] + ".sql") {
                                throw new Error('deployment script in wrong place or is named wrong internally' + m2);
                            }
                            reg[key].push(m2[1]);
                        }
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    planfile.push("%syntax-version=1.0.0\n  %project=proj\n  %uri=https://github.com/projinc/proj-sql\n  ");
                    resolved = [];
                    unresolved = [];
                    deps = Object.assign({
                        '/deploy/apps/index.sql': Object.keys(deps)
                            .filter(function (dep) { return dep.match(/^\/deploy\//); })
                            .map(function (dep) { return dep.replace(/^\/deploy\//, '').replace(/.sql$/, ''); }),
                    }, deps);
                    dep_resolve('apps/index', resolved, unresolved);
                    index = resolved.indexOf('apps/index');
                    resolved.splice(index);
                    // procedures/verify_function 2017-08-08T22:22:30Z root <root@5b0c196eeb62> # verify_function
                    resolved.forEach(function (res) {
                        if (deps['/deploy/' + res + '.sql'].length) {
                            planfile.push(res + " [" + deps['/deploy/' + res + '.sql'].join(' ') + "] " + now + " root <root@5b0c196eeb62> # add " + res);
                        }
                        else {
                            planfile.push(res + " " + now + " root <root@5b0c196eeb62> # add " + res);
                        }
                    });
                    console.log("\n  --\n  --      |||\n  --     (o o)\n  -- ooO--(_)--Ooo-\n  --\n  --\n      ");
                    fs.writeFileSync('plans/index.plan', planfile.join('\n'));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=plan.js.map