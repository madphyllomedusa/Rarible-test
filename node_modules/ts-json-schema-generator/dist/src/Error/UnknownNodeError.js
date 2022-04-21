"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownNodeError = void 0;
const BaseError_1 = require("./BaseError");
class UnknownNodeError extends BaseError_1.BaseError {
    constructor(node, reference) {
        super(`Unknown node "${node.getFullText()}`);
        this.node = node;
        this.reference = reference;
    }
    getNode() {
        return this.node;
    }
    getReference() {
        return this.reference;
    }
}
exports.UnknownNodeError = UnknownNodeError;
//# sourceMappingURL=UnknownNodeError.js.map