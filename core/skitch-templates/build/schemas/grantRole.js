"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./role");
var skitch_utils_1 = require("skitch-utils");
exports.requires = function (res) { return [
    role_1.change({ role: res.role }),
    role_1.change({ role: res.grantee }),
]; };
exports.change = function (_a) {
    var grantee = _a.grantee, role = _a.role;
    return [
        'roles',
        grantee,
        'grants',
        role,
    ];
};
var questions = [
    {
        type: 'autocomplete',
        name: 'role',
        message: 'choose the role to grant',
        source: skitch_utils_1.searchRoles,
        required: true,
    },
    {
        type: 'autocomplete',
        name: 'grantee',
        message: 'choose the role to grant to',
        source: skitch_utils_1.searchRoles,
        required: true,
    },
];
exports.default = questions;
//# sourceMappingURL=grantRole.js.map