"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sluggify = function (text) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};
//# sourceMappingURL=utils.js.map