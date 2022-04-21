import { Blockchain } from "@rarible/api-client";
import type { OperationResult } from "@rarible/tezos-sdk";
import type { TezosNetwork } from "@rarible/tezos-sdk";
import type { IBlockchainTransaction } from "../domain";
export declare class BlockchainTezosTransaction implements IBlockchainTransaction {
    transaction: OperationResult;
    network: TezosNetwork;
    blockchain: Blockchain;
    constructor(transaction: OperationResult, network: TezosNetwork);
    hash(): string;
    wait(): Promise<{
        blockchain: Blockchain;
        hash: string;
    }>;
    getTxLink(): string;
}
