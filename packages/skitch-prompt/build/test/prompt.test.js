(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_1 = require("../index");
    describe('arguments', function () {
        it('empty when all args supplied', function () {
            var questions = [
                {
                    name: 'hello',
                },
                {
                    name: 'world',
                },
            ];
            var argv = {
                hello: 1,
                world: 2,
            };
            expect(index_1.filter(questions, argv)).toEqual([]);
            expect(argv).toEqual({
                hello: 1,
                world: 2,
            });
        });
        it('empty when all args supplied', function () {
            var questions = [
                {
                    _: true,
                    name: 'foo',
                },
                {
                    name: 'bar',
                },
                {
                    _: true,
                    name: 'baz',
                },
            ];
            var argv = {
                _: [1, 3],
                bar: 2,
            };
            var _1 = index_1.filter(questions, argv);
            var _2 = index_1._filter(questions, argv);
            expect(_2).toEqual([]);
            expect(argv).toEqual({
                _: [],
                foo: 1,
                bar: 2,
                baz: 3,
            });
        });
    });
});
//# sourceMappingURL=prompt.test.js.map