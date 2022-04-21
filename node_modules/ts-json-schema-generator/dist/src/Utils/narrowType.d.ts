import { BaseType } from "../Type/BaseType";
export declare function narrowType(type: BaseType | undefined, predicate: (type: BaseType | undefined) => boolean): BaseType | undefined;
