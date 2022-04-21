import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import { PreparedTransaction } from "../prepared-transaction";
import type { DebugLogger } from "../../logger/debug-logger";
export interface IVerifyCollectionRequest {
    signer: IWalletSigner;
    mint: PublicKey;
    collection: PublicKey;
}
export interface ISolanaCollectionSdk {
    verifyCollection(request: IVerifyCollectionRequest): Promise<PreparedTransaction>;
}
export declare class SolanaCollectionSdk implements ISolanaCollectionSdk {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: DebugLogger);
    verifyCollection(request: IVerifyCollectionRequest): Promise<PreparedTransaction>;
}
