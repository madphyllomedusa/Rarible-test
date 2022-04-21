import { BaseType } from "../Type/BaseType";
import { LiteralType } from "../Type/LiteralType";
import { StringType } from "../Type/StringType";
export declare function getTypeKeys(type: BaseType | undefined): LiteralType[];
export declare function getTypeByKey(type: BaseType | undefined, index: LiteralType | StringType): BaseType | undefined;
