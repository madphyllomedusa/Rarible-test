import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class ConditionalTypeNodeParser implements SubNodeParser {
    private typeChecker;
    private childNodeParser;
    constructor(typeChecker: ts.TypeChecker, childNodeParser: NodeParser);
    supportsNode(node: ts.ConditionalTypeNode): boolean;
    createType(node: ts.ConditionalTypeNode, context: Context): BaseType | undefined;
    private getTypeParameterName;
    private createSubContext;
}
