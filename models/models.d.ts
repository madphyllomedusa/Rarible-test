import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"

export declare type MetaAttributes = {
    key: string | undefined;
    value?: string;
    type?: string;
    format?: string;
    amount?: number;
}

export declare type Properties = {
    attributesArray: Array<MetaAttributes>;
    collectionTotal: number;
};

export declare type AttributeValues = {
    value: string | undefined;
    amount: number;
}

export declare type AttributeKeys = {
    key: string | undefined;
    values: Array<AttributeValues>
}

export declare type CollectionAttibutes = {
    collectionId: string;
    attributes: Array<AttributeKeys>
    collectionTotal: number
}

export declare type ItemInBase = {
    tokenId: string;
    collectionId: string;
    attributes: Array<MetaAttributes>
    rarityScore: number;
    collectionRank: number;
}

export declare type ScorePrice = {
    score: number;
    price: string | undefined;
}