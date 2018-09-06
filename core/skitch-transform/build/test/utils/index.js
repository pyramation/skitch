"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanLines = function (sql) {
    return sql.split('\n').map(function (l) { return l.trim(); }).filter(function (a) { return a; }).join('\n');
};
exports.transform = function (obj, props) {
    var copy = null;
    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = exports.transform(obj[i], props);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object || typeof obj === 'object') {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (props.hasOwnProperty(attr)) {
                    if (typeof props[attr] === 'function') {
                        copy[attr] = props[attr](obj[attr]);
                    }
                    else if (props[attr].hasOwnProperty(obj[attr])) {
                        copy[attr] = props[attr][obj[attr]];
                    }
                    else {
                        copy[attr] = exports.transform(obj[attr], props);
                    }
                }
                else {
                    copy[attr] = exports.transform(obj[attr], props);
                }
            }
            else {
                copy[attr] = exports.transform(obj[attr], props);
            }
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
var noop = function () { return undefined; };
exports.cleanTree = function (tree) {
    return exports.transform(tree, {
        stmt_len: noop,
        stmt_location: noop,
        location: noop
    });
};
//# sourceMappingURL=index.js.map