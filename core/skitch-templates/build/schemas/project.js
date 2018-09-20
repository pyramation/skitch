"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.change = function (_a) {
    var refproject = _a.refproject, refchange = _a.refchange;
    return [
        'projects',
        refproject
    ].concat(refchange.split('/'));
};
exports.requires = function (res) { return []; };
var questions = [
    {
        type: 'string',
        name: 'refproject',
        message: 'enter a ref project name',
        required: true
    },
    {
        type: 'string',
        name: 'refchange',
        message: 'enter a ref change name',
        required: true
    }
];
exports.default = questions;
//# sourceMappingURL=project.js.map