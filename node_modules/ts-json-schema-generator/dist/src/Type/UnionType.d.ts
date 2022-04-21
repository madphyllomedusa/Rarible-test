import { BaseType } from "./BaseType";
export declare class UnionType extends BaseType {
    private readonly types;
    constructor(types: readonly (BaseType | undefined)[]);
    getId(): string;
    getName(): string;
    getTypes(): BaseType[];
    normalize(): BaseType | undefined;
}
