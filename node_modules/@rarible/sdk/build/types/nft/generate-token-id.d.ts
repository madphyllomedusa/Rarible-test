import type { Binary, ContractAddress, UnionAddress } from "@rarible/types";
export declare type GenerateTokenIdRequest = {
    collection: ContractAddress;
    minter: UnionAddress;
};
export declare type TokenId = {
    tokenId: string;
    signature: {
        v: number;
        r: Binary;
        s: Binary;
    };
};
export declare type IGenerateTokenId = (prepare: GenerateTokenIdRequest) => Promise<TokenId | undefined>;
