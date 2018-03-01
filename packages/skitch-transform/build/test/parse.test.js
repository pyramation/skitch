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
    describe('transforms', function () {
        it('function', function () {
            var result = index_1.transform("SELECT * FROM original.table;", {
                schemaname: function (value) {
                    if (value === 'original') {
                        return 'amazing';
                    }
                    return value;
                },
            });
            expect(result).toEqual("SELECT * FROM \"amazing\" . \"table\"");
        });
        it('object', function () {
            var result = index_1.transform("SELECT * FROM original.table;", {
                schemaname: {
                    original: 'amazing',
                },
            });
            expect(result).toEqual("SELECT * FROM \"amazing\" . \"table\"");
        });
        it('integration', function () {
            var result = index_1.transform("CREATE TABLE users_private.user_account (\n    user_id uuid PRIMARY KEY REFERENCES users.user (id) ON DELETE CASCADE,\n    email text NOT NULL UNIQUE CHECK (email ~* '^.+@.+..+$'),\n    password_hash text NOT NULL\n);\n", {
                schemaname: {
                    users_private: 'customers',
                },
                relname: {
                    user_account: 'profile',
                },
            });
            expect(result).toEqual("CREATE TABLE \"customers\" . \"profile\" ( \"user_id\" uuid PRIMARY KEY REFERENCES \"users\" . \"user\" ( id ) ON DELETE CASCADE, \"email\" text NOT NULL UNIQUE CHECK ((\"email\") ~* ('^.+@.+..+$')), \"password_hash\" text NOT NULL ) ;");
        });
    });
});
//# sourceMappingURL=parse.test.js.map