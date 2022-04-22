import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"

export declare type MetaAttributes = {
    key: string | undefined;
    value?: string;
    type?: string;
    format?: string;
    rarityPerc: number;
    rarityScore: number;
}

export declare type Properties = {
    attributesArray: Array<MetaAttributes>;
    collectionTotal: number;
};