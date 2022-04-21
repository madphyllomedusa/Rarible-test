import ts from "typescript";
import { Context, NodeParser } from "../NodeParser";
import { SubNodeParser } from "../SubNodeParser";
import { BaseType } from "../Type/BaseType";
export declare class MappedTypeNodeParser implements SubNodeParser {
    private childNodeParser;
    private readonly additionalProperties;
    constructor(childNodeParser: NodeParser, additionalProperties: boolean);
    supportsNode(node: ts.MappedTypeNode): boolean;
    createType(node: ts.MappedTypeNode, context: Context): BaseType | undefined;
    private getProperties;
    private getValues;
    private getAdditionalProperties;
    private createSubContext;
}
