"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./cmds/add");
var bundle_1 = require("./cmds/bundle");
var createdb_1 = require("./cmds/createdb");
var deploy_1 = require("./cmds/deploy");
var dropdb_1 = require("./cmds/dropdb");
var ext_1 = require("./cmds/ext");
var format_1 = require("./cmds/format");
var generate_1 = require("./cmds/generate");
var info_1 = require("./cmds/info");
var init_1 = require("./cmds/init");
var install_1 = require("./cmds/install");
var maketest_1 = require("./cmds/maketest");
var package_1 = require("./cmds/package");
var plan_1 = require("./cmds/plan");
var rename_1 = require("./cmds/rename");
var resolve_1 = require("./cmds/resolve");
var revert_1 = require("./cmds/revert");
var start_1 = require("./cmds/start");
var verify_1 = require("./cmds/verify");
exports.default = {
    add: add_1.default, bundle: bundle_1.default, createdb: createdb_1.default, deploy: deploy_1.default, dropdb: dropdb_1.default, ext: ext_1.default, format: format_1.default, generate: generate_1.default, info: info_1.default, init: init_1.default, install: install_1.default, maketest: maketest_1.default, package: package_1.default, plan: plan_1.default, rename: rename_1.default, resolve: resolve_1.default, revert: revert_1.default, start: start_1.default, verify: verify_1.default
};
//# sourceMappingURL=index.js.map