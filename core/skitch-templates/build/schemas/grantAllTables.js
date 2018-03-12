"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var table_1 = require("./table");
var skitch_utils_1 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    table_1.change(res),
]; };
exports.change = function (_a) {
    var schema = _a.schema, role = _a.role;
    return [
        'schemas',
        schema,
        'grants',
        ("grant_all_tables_to_" + role).toLowerCase(),
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
        source: skitch_utils_1.searchRoles,
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=grantAllTables.js.map