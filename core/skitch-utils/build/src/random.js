"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = function () {
    return Math.random()
        .toString(36)
        .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15);
};
//# sourceMappingURL=random.js.map