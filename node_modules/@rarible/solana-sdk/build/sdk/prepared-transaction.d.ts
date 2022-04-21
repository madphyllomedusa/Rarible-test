import type { Connection, Commitment } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { ITransactionPreparedInstructions } from "../common/transactions";
import type { TransactionResult } from "../types";
import type { DebugLogger } from "../logger/debug-logger";
export declare class PreparedTransaction {
    private readonly connection;
    readonly data: ITransactionPreparedInstructions;
    readonly signer: IWalletSigner;
    private readonly logger;
    readonly onSubmit?: ((tx: TransactionResult) => void) | undefined;
    constructor(connection: Connection, data: ITransactionPreparedInstructions, signer: IWalletSigner, logger: DebugLogger, onSubmit?: ((tx: TransactionResult) => void) | undefined);
    submit(commitment: Commitment): Promise<TransactionResult>;
}
