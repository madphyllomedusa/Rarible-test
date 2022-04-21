"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNodeGlobalVars = void 0;
function updateNodeGlobalVars() {
    global.FormData = require("form-data");
    global.window = {
        fetch: require("node-fetch"),
        dispatchEvent: function () { },
    };
    global.CustomEvent = function CustomEvent() {
        return;
    };
}
exports.updateNodeGlobalVars = updateNodeGlobalVars;
