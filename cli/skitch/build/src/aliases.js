"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_1 = require("./cmds/add");
var build_1 = require("./cmds/build");
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
var sqitch_1 = require("./cmds/sqitch");
var sql_1 = require("./cmds/sql");
var start_1 = require("./cmds/start");
var verify_1 = require("./cmds/verify");
exports.default = {
    add: add_1.aliases, build: build_1.aliases, bundle: bundle_1.aliases, createdb: createdb_1.aliases, deploy: deploy_1.aliases, dropdb: dropdb_1.aliases, ext: ext_1.aliases, format: format_1.aliases, generate: generate_1.aliases, info: info_1.aliases, init: init_1.aliases, install: install_1.aliases, maketest: maketest_1.aliases, package: package_1.aliases, plan: plan_1.aliases, rename: rename_1.aliases, resolve: resolve_1.aliases, revert: revert_1.aliases, sqitch: sqitch_1.aliases, sql: sql_1.aliases, start: start_1.aliases, verify: verify_1.aliases
};
//# sourceMappingURL=aliases.js.map