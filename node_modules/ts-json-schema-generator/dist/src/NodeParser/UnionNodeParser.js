"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const UnionType_1 = require("../Type/UnionType");
const notUndefined_1 = require("../Utils/notUndefined");
class UnionNodeParser {
    constructor(typeChecker, childNodeParser) {
        this.typeChecker = typeChecker;
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.UnionType;
    }
    createType(node, context) {
        const types = node.types
            .map((subnode) => {
            return this.childNodeParser.createType(subnode, context);
        })
            .filter(notUndefined_1.notUndefined);
        if (types.length === 1) {
            return types[0];
        }
        else if (types.length === 0) {
            return undefined;
        }
        return new UnionType_1.UnionType(types);
    }
}
exports.UnionNodeParser = UnionNodeParser;
//# sourceMappingURL=UnionNodeParser.js.map