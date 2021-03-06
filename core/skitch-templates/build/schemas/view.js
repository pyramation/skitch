"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
var skitch_utils_1 = require("skitch-utils");
exports.requires = function (res) { return [
    schema_1.change(res)
]; };
exports.change = function (_a) {
    var schema = _a.schema, view = _a.view;
    return [
        'schemas',
        schema,
        'views',
        view,
        'view'
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
        type: 'string',
        name: 'view',
        message: 'enter a view name',
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=view.js.map