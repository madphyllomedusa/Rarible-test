import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
import { ReferenceType } from "../Type/ReferenceType";
export declare class InterfaceAndClassNodeParser implements SubNodeParser {
    private typeChecker;
    private childNodeParser;
    private readonly additionalProperties;
    constructor(typeChecker: ts.TypeChecker, childNodeParser: NodeParser, additionalProperties: boolean);
    supportsNode(node: ts.InterfaceDeclaration | ts.ClassDeclaration): boolean;
    createType(node: ts.InterfaceDeclaration | ts.ClassDeclaration, context: Context, reference?: ReferenceType): BaseType | undefined;
    private getArrayItemType;
    private getBaseTypes;
    private getProperties;
    private getAdditionalProperties;
    private getTypeId;
    private getPropertyName;
}
