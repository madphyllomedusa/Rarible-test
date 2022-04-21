import ts from "typescript";
import { Context } from "./NodeParser";
import { SubNodeParser } from "./SubNodeParser";
import { BaseType } from "./Type/BaseType";
import { ReferenceType } from "./Type/ReferenceType";
export declare class ExposeNodeParser implements SubNodeParser {
    private typeChecker;
    private subNodeParser;
    private expose;
    private jsDoc;
    constructor(typeChecker: ts.TypeChecker, subNodeParser: SubNodeParser, expose: "all" | "none" | "export", jsDoc: "none" | "extended" | "basic");
    supportsNode(node: ts.Node): boolean;
    createType(node: ts.Node, context: Context, reference?: ReferenceType): BaseType | undefined;
    private isExportNode;
    private getDefinitionName;
}
