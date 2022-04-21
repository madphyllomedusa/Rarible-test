import ts from "typescript";
import { Context } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class HiddenNodeParser implements SubNodeParser {
    private typeChecker;
    constructor(typeChecker: ts.TypeChecker);
    supportsNode(node: ts.KeywordTypeNode): boolean;
    createType(node: ts.KeywordTypeNode, context: Context): BaseType | undefined;
}
