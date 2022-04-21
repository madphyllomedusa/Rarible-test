"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenNodeParser = void 0;
const isHidden_1 = require("../Utils/isHidden");
class HiddenNodeParser {
    constructor(typeChecker) {
        this.typeChecker = typeChecker;
    }
    supportsNode(node) {
        return isHidden_1.isNodeHidden(node);
    }
    createType(node, context) {
        return undefined;
    }
}
exports.HiddenNodeParser = HiddenNodeParser;
//# sourceMappingURL=HiddenTypeNodeParser.js.map