"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var skitch_utils_1 = require("skitch-utils");
var skitch_utils_2 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
]; };
exports.change = function (_a) {
    var schema = _a.schema, table = _a.table, role = _a.role;
    return [
        'schemas',
        schema,
        'grants',
        "grant_schema_to_" + role,
    ];
};
var questions = [
    {
        type: 'autocomplete',
        name: 'schema',
        message: 'enter a schema name',
        source: skitch_utils_1.searchSchemas,
        required: true,
    },
    {
        type: 'autocomplete',
        name: 'role',
        message: 'choose the role',
        source: skitch_utils_2.searchRoles,
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=grantSchema.js.map