(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/skitch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var skitch_1 = require("../src/skitch");
    /**
     * Dummy test
     */
    describe('Dummy test', function () {
        it('works if true is truthy', function () {
            expect(true).toBeTruthy();
        });
        it('DummyClass is instantiable', function () {
            expect(new skitch_1.default()).toBeInstanceOf(skitch_1.default);
        });
    });
});
//# sourceMappingURL=skitch.test.js.map