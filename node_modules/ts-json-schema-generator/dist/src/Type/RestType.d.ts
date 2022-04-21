import { ArrayType } from "./ArrayType";
import { BaseType } from "./BaseType";
export declare class RestType extends BaseType {
    private item;
    constructor(item: ArrayType);
    getId(): string;
    getType(): ArrayType;
}
