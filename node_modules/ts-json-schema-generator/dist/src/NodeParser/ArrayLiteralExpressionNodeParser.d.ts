import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class ArrayLiteralExpressionNodeParser implements SubNodeParser {
    private childNodeParser;
    constructor(childNodeParser: NodeParser);
    supportsNode(node: ts.ArrayLiteralExpression): boolean;
    createType(node: ts.ArrayLiteralExpression, context: Context): BaseType | undefined;
}
