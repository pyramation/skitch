"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column = require("./schemas/column");
var fixture = require("./schemas/fixture");
var foreignKey = require("./schemas/foreignKey");
var grantExecute = require("./schemas/grantExecute");
var grantRole = require("./schemas/grantRole");
var grantSchema = require("./schemas/grantSchema");
var grantTable = require("./schemas/grantTable");
var index = require("./schemas/index");
var peoplestamps = require("./schemas/peoplestamps");
var policy = require("./schemas/policy");
var procedure = require("./schemas/procedure");
var role = require("./schemas/role");
var rowLevelSecurity = require("./schemas/rowLevelSecurity");
var schema = require("./schemas/schema");
var table = require("./schemas/table");
var timestamps = require("./schemas/timestamps");
var trigger = require("./schemas/trigger");
var type = require("./schemas/type");
var uniqueIndex = require("./schemas/uniqueIndex");
var utility = require("./schemas/utility");
exports.default = {
    column: column, fixture: fixture, foreignKey: foreignKey, grantExecute: grantExecute, grantRole: grantRole, grantSchema: grantSchema, grantTable: grantTable, index: index, peoplestamps: peoplestamps, policy: policy, procedure: procedure, role: role, rowLevelSecurity: rowLevelSecurity, schema: schema, table: table, timestamps: timestamps, trigger: trigger, type: type, uniqueIndex: uniqueIndex, utility: utility
};
//# sourceMappingURL=index.js.map