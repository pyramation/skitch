(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-walkup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_walkup_1 = require("node-walkup");
    var Skitch = /** @class */ (function () {
        function Skitch(baseDir) {
            if (baseDir === void 0) { baseDir = process.cwd(); }
            this.baseDir = baseDir;
        }
        Skitch.prototype.getconf = function () {
            var _this = this;
            node_walkup_1.default('sqitch.conf', {
                cwd: this.baseDir,
            }, function (err, matches) {
                if (err) {
                    throw new Error(err);
                }
                if (!matches || !matches.length) {
                    // return this.setup();
                }
                _this.projectDir = matches[0].dir;
            });
        };
        Skitch.prototype.init = function () {
            console.log('adding files...');
        };
        Skitch.prototype.registerTemplate = function (template) {
            console.log(this);
        };
        return Skitch;
    }());
    exports.Skitch = Skitch;
});
//# sourceMappingURL=skitch.js.map