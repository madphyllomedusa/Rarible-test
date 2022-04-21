import type { TezosNetwork, TezosProvider } from "@rarible/tezos-sdk";
import type { ICreateCollection } from "../../types/nft/deploy/domain";
import type { MaybeProvider } from "./common";
export declare class TezosCreateCollection {
    private provider;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, network: TezosNetwork);
    private getDeployOperation;
    createCollection: ICreateCollection;
}
