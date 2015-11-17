/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
'use strict';

var uuid = require("uuid");

function Event(id, operation, entityId, data) {
    if (!(this instanceof Event)) {
        return new Event(id, operation, entityId, data);
    }
    if (arguments.length === 4) {
        this.id = id;
        this.operation = operation;
        this.entityId = entityId;
        this.data = data;
    } else if (arguments.length === 3) {
        this.id = uuid.v4();
        this.operation = id;
        this.entityId = operation;
        this.data = entityId;
    } else {
        throw new Error("Improper amount of arguments.");
    }
    this.ts = new Date();
}


module.exports = Event;
