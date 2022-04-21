/// <reference types="node" />
import type { default as BN } from "bn.js";
declare type StringPublicKey = string;
export declare enum MetadataKey {
    Uninitialized = 0,
    MetadataV1 = 4,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    MasterEditionV2 = 6,
    EditionMarker = 7
}
export declare class Creator {
    address: StringPublicKey;
    verified: number;
    share: number;
    constructor(args: {
        address: StringPublicKey;
        verified: number;
        share: number;
    });
}
export declare class Data {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
    constructor(args: {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Creator[] | null;
    });
}
export declare class CreateMetadataArgs {
    instruction: number;
    data: Data;
    isMutable: boolean;
    constructor(args: {
        data: Data;
        isMutable: boolean;
    });
}
export declare class UpdateMetadataArgs {
    instruction: number;
    data: Data | null;
    updateAuthority: StringPublicKey | null;
    primarySaleHappened: boolean | null;
    constructor(args: {
        data?: Data;
        updateAuthority?: string;
        primarySaleHappened: boolean | null;
    });
}
export declare class CreateMasterEditionArgs {
    instruction: number;
    maxSupply: BN | null;
    constructor(args: {
        maxSupply: BN | null;
    });
}
export declare class Metadata {
    key: MetadataKey;
    updateAuthority: StringPublicKey;
    mint: StringPublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: number | null;
    masterEdition?: StringPublicKey;
    edition?: StringPublicKey;
    constructor(args: {
        updateAuthority: StringPublicKey;
        mint: StringPublicKey;
        data: Data;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number | null;
    });
}
export declare const METADATA_SCHEMA: Map<any, any>;
export declare const decodeMetadata: (buffer: Buffer) => Metadata;
export declare const extendBorsh: () => void;
export {};
