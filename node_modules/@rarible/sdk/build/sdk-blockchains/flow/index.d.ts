import type { FlowWallet } from "@rarible/sdk-wallet";
import type { AuthWithPrivateKey, FlowEnv } from "@rarible/flow-sdk/build/types";
import type { Maybe } from "@rarible/types/build/maybe";
import type { ConfigurationParameters } from "@rarible/ethereum-api-client";
import type { IApisSdk, IRaribleInternalSdk } from "../../domain";
export declare function createFlowSdk(wallet: Maybe<FlowWallet>, apis: IApisSdk, network: FlowEnv, params?: ConfigurationParameters, auth?: AuthWithPrivateKey): IRaribleInternalSdk;
