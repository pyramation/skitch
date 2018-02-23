(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmds/add", "./cmds/init", "./cmds/install", "./cmds/template"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var add_1 = require("./cmds/add");
    var init_1 = require("./cmds/init");
    var install_1 = require("./cmds/install");
    var template_1 = require("./cmds/template");
    exports.default = {
        add: add_1.default,
        init: init_1.default,
        install: install_1.default,
        template: template_1.default,
    };
});
//# sourceMappingURL=index.js.map