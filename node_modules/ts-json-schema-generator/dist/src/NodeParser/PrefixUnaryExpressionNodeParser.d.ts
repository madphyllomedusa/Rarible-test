import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class PrefixUnaryExpressionNodeParser implements SubNodeParser {
    private childNodeParser;
    constructor(childNodeParser: NodeParser);
    supportsNode(node: ts.PrefixUnaryExpression): boolean;
    createType(node: ts.PrefixUnaryExpression, context: Context): BaseType;
}
