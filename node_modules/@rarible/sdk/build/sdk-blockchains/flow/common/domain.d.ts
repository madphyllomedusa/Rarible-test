import type { Blockchain } from "@rarible/api-client";
import type { FlowContractAddress } from "@rarible/flow-sdk";
export declare type ParsedFlowItemIdFromUnionItemId = {
    blockchain: Blockchain;
    contract: FlowContractAddress;
    itemId: string;
};
