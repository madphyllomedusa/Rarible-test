/**
 * Middleware function type
 * Middleware function gets `callable` method and arguments with which it will be called.
 * Must return a Promise which will resolve as array [(new) function, callback]
 * 	where:
 * 		function - original method, or replace for it (f.e. wrapped).
 * 		callback - function which will be called with "promisified" result of execution `callable`,
 * 			should return received promise, new promise, or new result value
 */
export declare type Middleware<Callable extends (...args: any[]) => any = (...args: any[]) => any> = (callable: Callable, args: Parameters<Callable>) => Promise<[
    (...args: Parameters<Callable>) => ReturnType<Callable>,
    ((p: Promise<ReturnType<Callable>>) => Promise<ReturnType<Callable>>) | void
]>;
export declare class Middlewarer {
    private middlewares;
    /**
     * Add middleware to chain
     */
    use(middleware: Middleware): this;
    /**
     * Call method with middlewares chain
     *
     * @param callable - original method for call
     * @param ...args - callable arguments
     */
    call<Fun extends (...args: any[]) => Promise<any>>(callable: Fun, ...args: Parameters<Fun>): Promise<ReturnType<Fun>>;
    /**
     * Wrap function to execute with middlewares in future
     * @example
     * 	function fn(i: number) { ... }
     * 	const wrappedFn = middlewarer.wrap(fn)
     * 	fn(10)
     *
     * @param callable
     * @param meta metadata for new method
     */
    wrap<Fun extends (...args: any[]) => Promise<any>>(callable: Fun, meta?: {
        methodName?: string;
    }): ((...args: Parameters<Fun>) => ReturnType<Fun>) | Fun;
    /**
     * Wrap all methods in object
     *
     * @param object
     * @param meta metadata for new method
     */
    wrapObjectMethods(object: any, meta: {
        namespace: string;
    }): void;
    static skipMiddleware<T extends Function>(something: T): T & {
        skipMiddleware: true;
    };
}
