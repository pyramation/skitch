(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "glob"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fuzzy = require('fuzzy');
    var path_1 = require("path");
    var glob_1 = require("glob");
    exports.searchProcedures = function (answers, input) {
        input = input || '';
        return new Promise(function (resolve) {
            var schema = answers.schema;
            if (!schema) {
                schema = '**';
            }
            // TODO take in __dirname as argument for CLI
            var procs = glob_1.default.sync(path_1.resolve(__dirname + "/../../deploy/schemas/" + schema + "/procedures/**.sql"));
            procs = procs.map(function (f) { return path_1.basename(f).replace('.sql', ''); });
            setTimeout(function () {
                var fuzzyResult = fuzzy.filter(input, procs);
                resolve(fuzzyResult.map(function (el) {
                    return el.original;
                }));
            }, 25);
        });
    };
});
//# sourceMappingURL=procedures.js.map