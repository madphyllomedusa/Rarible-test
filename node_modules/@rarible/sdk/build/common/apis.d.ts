import type { ConfigurationParameters } from "@rarible/api-client";
import type { RaribleSdkEnvironment } from "../config/domain";
import type { IApisSdk } from "../domain";
export declare function createApisSdk(env: RaribleSdkEnvironment, params?: ConfigurationParameters): IApisSdk;
