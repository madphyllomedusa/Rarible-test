import { Config } from "../src/Config";
import { CircularReferenceTypeFormatter } from "../src/CircularReferenceTypeFormatter";
import { TypeFormatter } from "../src/TypeFormatter";
import { MutableTypeFormatter } from "../src/MutableTypeFormatter";
export declare type FormatterAugmentor = (formatter: MutableTypeFormatter, circularReferenceTypeFormatter: CircularReferenceTypeFormatter) => void;
export declare function createFormatter(config: Config, augmentor?: FormatterAugmentor): TypeFormatter;
