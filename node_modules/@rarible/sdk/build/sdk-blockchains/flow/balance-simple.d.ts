import type { FlowEnv } from "@rarible/flow-sdk/build/types";
import type { UnionAddress } from "@rarible/types";
import type { AssetType } from "@rarible/api-client";
import type { BigNumberValue } from "@rarible/utils";
export declare function getSimpleFlowFungibleBalance(network: FlowEnv, address: UnionAddress, assetType: AssetType): Promise<BigNumberValue>;
