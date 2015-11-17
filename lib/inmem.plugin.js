/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
'use strict';

//Expects data with id property and ts
function inMemoryPlugin() {
    var self = this;

    self.storage = [];

    self._write = function (obj) {
        self.storage.push(obj);
        self.emit("data", obj);
    };

    self._read = function (id, cb) {
        self.storage.sort(function (a, b) {
            return a.ts > b.ts;
        });

        var foundI = self.storage.findIndex(function (ele) {
            return ele.id === id;
        });

        if (foundI === -1) {
            cb(new Error("Element not found in memory"));
        } else {
            cb(null, self.storage.slice(foundI));
        }
    };
}


//Polyfill findIndex
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

module.exports = inMemoryPlugin;
