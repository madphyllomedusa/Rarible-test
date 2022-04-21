import type { Creator, Royalty } from "@rarible/api-client";
export declare type MintRequest = {
    uri: string;
    supply: number;
    lazyMint: boolean;
    creators?: Creator[];
    royalties?: Royalty[];
};
