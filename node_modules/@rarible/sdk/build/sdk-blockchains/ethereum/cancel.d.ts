import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { ICancel } from "../../types/order/cancel/domain";
export declare class EthereumCancel {
    private readonly sdk;
    private network;
    constructor(sdk: RaribleSdk, network: EthereumNetwork);
    cancel: ICancel;
}
