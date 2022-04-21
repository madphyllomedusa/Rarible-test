import type { Royalty } from "@rarible/api-client/build/models/Royalty";
export declare type FlowMintRequest = {
    collection: string;
    uri: string;
    royalties?: Royalty[];
};
