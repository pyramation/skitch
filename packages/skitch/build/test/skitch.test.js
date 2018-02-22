(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/skitch", "../src/utils/inquirer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var skitch_1 = require("../src/skitch");
    var inquirer_1 = require("../src/utils/inquirer");
    /**
     * Skitch test
     */
    describe('Skitch test', function () {
        it('Skitch is instantiable', function () {
            expect(new skitch_1.Skitch()).toBeInstanceOf(skitch_1.Skitch);
        });
        it('init in folder where sqitch.plan does not exist', function () {
            var fail = false;
            try {
                var skitch = new skitch_1.Skitch(__dirname + "/fixtures/test1");
                skitch.init();
            }
            catch (e) {
                fail = true;
            }
            expect(fail).toBe(false);
        });
        it('init in folder where sqitch.plan exists', function () {
            var skitch = new skitch_1.Skitch(__dirname + "/fixtures/test2");
            skitch.init();
        });
        it.only('ask', function () {
            var questions = inquirer_1.filter([{ name: 'address' }, { name: 'amount' }], {
                address: 1,
                other: 1,
                prop: 1,
            });
            console.log(questions);
        });
        xit('registerTemplate', function () {
            var skitch = new skitch_1.Skitch({
                hi: 1,
            });
            skitch.registerTemplate();
        });
    });
});
//# sourceMappingURL=skitch.test.js.map