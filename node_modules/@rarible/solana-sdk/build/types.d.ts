import type { Cluster } from "@solana/web3.js";
export interface TransactionResult {
    txId: string;
    slot?: number;
}
export declare type SolanaCluster = Cluster;
