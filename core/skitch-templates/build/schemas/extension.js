"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requires = function (res) { return []; };
exports.change = function (_a) {
    var extension = _a.extension;
    return [
        'extensions',
        extension
    ];
};
var questions = [
    {
        type: 'string',
        name: 'extension',
        message: 'enter a extension name',
        required: true,
    }
];
exports.default = questions;
//# sourceMappingURL=extension.js.map