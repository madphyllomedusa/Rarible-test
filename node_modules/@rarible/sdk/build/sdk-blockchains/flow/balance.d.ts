import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import type { FlowSdk } from "@rarible/flow-sdk";
import type { Maybe } from "@rarible/types/build/maybe";
import type { FlowWallet } from "@rarible/sdk-wallet";
import type { FlowEnv } from "@rarible/flow-sdk/build/types";
import type { RequestCurrency } from "../../common/domain";
export declare class FlowBalance {
    private sdk;
    private network;
    private wallet;
    constructor(sdk: FlowSdk, network: FlowEnv, wallet: Maybe<FlowWallet>);
    getBalance(address: UnionAddress, currency: RequestCurrency): Promise<BigNumberValue>;
}
