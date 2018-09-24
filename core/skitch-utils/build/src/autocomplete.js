"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fuzzy_1 = require("fuzzy");
exports.makeAutocompleteFunctionWithInput = function (keys) { return function (answers, input) {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy_1.filter(input, keys);
            resolve(fuzzyResult.map(function (el) {
                return el.original;
            }));
        }, 25);
    });
}; };
//# sourceMappingURL=autocomplete.js.map