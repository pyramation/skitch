"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var procedure_1 = require("./procedure");
var skitch_utils_1 = require("skitch-utils");
var skitch_utils_2 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res),
    procedure_1.change(res)
]; };
exports.change = function (_a) {
    var schema = _a.schema, table = _a.table, procedure = _a.procedure, role = _a.role;
    return [
        'schemas',
        schema,
        'grants',
        'procedures',
        procedure,
        "grant_execute_to_" + role
    ];
};
var questions = [
    {
        type: 'autocomplete',
        name: 'schema',
        message: 'enter a schema name',
        source: skitch_utils_1.searchSchemas,
        required: true
    },
    {
        type: 'autocomplete',
        name: 'procedure',
        message: 'enter a procedure name',
        source: skitch_utils_2.searchProcedures,
        required: true
    },
    {
        type: 'list',
        name: 'role',
        message: 'choose the role',
        choices: ['anonymous_user', 'known_user'],
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=grantExecute.js.map