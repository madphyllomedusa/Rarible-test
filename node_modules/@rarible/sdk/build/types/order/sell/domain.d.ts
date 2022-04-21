import type { Blockchain } from "@rarible/api-client";
import type { PrepareOrderRequest, PrepareOrderUpdateRequest, PrepareOrderUpdateResponse } from "../common";
import type { BasePrepareOrderResponse } from "../common";
import type { OrderInternalRequest } from "../common";
import type { OrderRequest } from "../common";
export declare type ISell = (request: PrepareOrderRequest) => Promise<PrepareSellResponse>;
export declare type ISellInternal = (request: PrepareSellInternalRequest) => Promise<PrepareSellInternalResponse>;
export declare type ISellUpdate = (request: PrepareOrderUpdateRequest) => Promise<PrepareOrderUpdateResponse>;
export declare type PrepareSellInternalResponse = BasePrepareOrderResponse<OrderInternalRequest>;
export declare type PrepareSellResponse = BasePrepareOrderResponse<OrderRequest>;
export declare type PrepareSellInternalRequest = {
    /**
   * Blockchain of request
   */
    blockchain: Blockchain;
};
