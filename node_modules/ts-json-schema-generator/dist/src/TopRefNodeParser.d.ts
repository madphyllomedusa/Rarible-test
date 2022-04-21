import ts from "typescript";
import { Context, NodeParser } from "./NodeParser";
import { BaseType } from "./Type/BaseType";
export declare class TopRefNodeParser implements NodeParser {
    private childNodeParser;
    private fullName;
    private topRef;
    constructor(childNodeParser: NodeParser, fullName: string | undefined, topRef: boolean);
    createType(node: ts.Node, context: Context): BaseType | undefined;
}
