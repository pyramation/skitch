(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./cmds/add", "./cmds/bundle", "./cmds/createdb", "./cmds/deploy", "./cmds/generate", "./cmds/init", "./cmds/plan", "./cmds/rename", "./cmds/revert", "./cmds/start", "./cmds/test", "./cmds/verify"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var add_1 = require("./cmds/add");
    var bundle_1 = require("./cmds/bundle");
    var createdb_1 = require("./cmds/createdb");
    var deploy_1 = require("./cmds/deploy");
    var generate_1 = require("./cmds/generate");
    var init_1 = require("./cmds/init");
    var plan_1 = require("./cmds/plan");
    var rename_1 = require("./cmds/rename");
    var revert_1 = require("./cmds/revert");
    var start_1 = require("./cmds/start");
    var test_1 = require("./cmds/test");
    var verify_1 = require("./cmds/verify");
    exports.default = {
        add: add_1.default, bundle: bundle_1.default, createdb: createdb_1.default, deploy: deploy_1.default, generate: generate_1.default, init: init_1.default, plan: plan_1.default, rename: rename_1.default, revert: revert_1.default, start: start_1.default, test: test_1.default, verify: verify_1.default
    };
});
//# sourceMappingURL=index.js.map