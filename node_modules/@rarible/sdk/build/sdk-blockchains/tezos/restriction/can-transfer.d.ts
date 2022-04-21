import type { ItemId, UnionAddress } from "@rarible/types";
import type { TezosProvider } from "@rarible/tezos-sdk";
import type { CanTransferResult } from "../../../types/nft/restriction/domain";
import type { MaybeProvider } from "../common";
export declare class TezosCanTransfer {
    private provider;
    constructor(provider: MaybeProvider<TezosProvider>);
    canTransfer(itemId: ItemId, from: UnionAddress, to: UnionAddress): Promise<CanTransferResult>;
}
