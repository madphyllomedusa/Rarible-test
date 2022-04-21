"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayLiteralExpressionNodeParser = void 0;
const typescript_1 = __importDefault(require("typescript"));
const notUndefined_1 = require("../Utils/notUndefined");
const TupleType_1 = require("../Type/TupleType");
class ArrayLiteralExpressionNodeParser {
    constructor(childNodeParser) {
        this.childNodeParser = childNodeParser;
    }
    supportsNode(node) {
        return node.kind === typescript_1.default.SyntaxKind.ArrayLiteralExpression;
    }
    createType(node, context) {
        if (node.elements) {
            const elements = node.elements.map((t) => this.childNodeParser.createType(t, context)).filter(notUndefined_1.notUndefined);
            return new TupleType_1.TupleType(elements);
        }
        return undefined;
    }
}
exports.ArrayLiteralExpressionNodeParser = ArrayLiteralExpressionNodeParser;
//# sourceMappingURL=ArrayLiteralExpressionNodeParser.js.map