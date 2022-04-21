import type { Middleware } from "../middleware/middleware";
import type { ISdkContext } from "../../domain";
import { LogsLevel } from "../../domain";
export declare function getErrorMessageString(err: any): string;
export declare function getInternalLoggerMiddleware(logsLevel: LogsLevel, sdkContext: ISdkContext): Middleware;
