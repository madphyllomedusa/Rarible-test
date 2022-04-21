import { BaseType } from "./BaseType";
export declare class TupleType extends BaseType {
    private types;
    constructor(types: readonly (BaseType | undefined)[]);
    getId(): string;
    getTypes(): readonly (BaseType | undefined)[];
}
