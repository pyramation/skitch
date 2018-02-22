(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmds/add", "./cmds/init", "./cmds/template"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var add = require("./cmds/add");
    var init = require("./cmds/init");
    var template = require("./cmds/template");
    exports.default = {
        add: add,
        init: init,
        template: template,
    };
});
//# sourceMappingURL=index.js.map