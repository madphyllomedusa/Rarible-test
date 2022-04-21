import { Blockchain } from "@rarible/api-client";
import type { FlowNetwork, FlowTransaction } from "@rarible/flow-sdk/build/types";
import type { IBlockchainTransaction } from "../domain";
export declare class BlockchainFlowTransaction implements IBlockchainTransaction {
    transaction: FlowTransaction;
    network: FlowNetwork;
    blockchain: Blockchain;
    constructor(transaction: FlowTransaction, network: FlowNetwork);
    hash(): string;
    wait(): Promise<{
        blockchain: Blockchain;
        hash: string;
    }>;
    getTxLink(): string;
}
