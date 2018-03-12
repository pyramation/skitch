"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requires = function (res) { return []; };
exports.change = function (_a) {
    var role = _a.role;
    return [
        'roles',
        role,
        'role',
    ];
};
var questions = [
    {
        type: 'string',
        name: 'role',
        message: 'enter a role name',
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=role.js.map