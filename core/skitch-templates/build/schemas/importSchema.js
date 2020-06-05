"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.change = function (_a) {
    var schema = _a.schema;
    return [
        'schemas',
        schema,
        'schema'
    ];
};
exports.requires = function (res) { return []; };
var questions = [
    {
        type: 'string',
        name: 'schema',
        message: 'enter a schema name',
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=importSchema.js.map