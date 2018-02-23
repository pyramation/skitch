(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmds/add", "./cmds/bundle", "./cmds/init", "./cmds/plan", "./cmds/template"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var add_1 = require("./cmds/add");
    var bundle_1 = require("./cmds/bundle");
    var init_1 = require("./cmds/init");
    var plan_1 = require("./cmds/plan");
    var template_1 = require("./cmds/template");
    exports.default = {
        add: add_1.default, bundle: bundle_1.default, init: init_1.default, plan: plan_1.default, template: template_1.default
    };
});
//# sourceMappingURL=index.js.map