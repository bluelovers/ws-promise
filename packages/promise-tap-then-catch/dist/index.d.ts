export declare function promiseTapThen<P extends Promise<any>, V extends any = Awaited<P>>(promise: P, handler: (value: V, ...argv: any[]) => any): P;
export declare type Constructor<E> = new (...args: any[]) => E;
export declare type ITapCatchArgvs<EC extends Constructor<unknown>> = [
	...EC[],
	(reason: EC, ...argv: any[]) => any
];
export declare function promiseTapCatch<P extends Promise<any>, E extends any = any, EC extends Constructor<any> = any>(promise: P, ...inputs: ITapCatchArgvs<EC> | [
	((reason: E, ...argv: any[]) => any)
]): P;
export declare function promiseTapThenCatch<P extends Promise<any>, V extends any = Awaited<P>, E extends any = any>(promise: P, handlerThen: (value: V, ...argv: any[]) => any, handlerCatch?: (reason: E, ...argv: any[]) => any): P;
export default promiseTapThenCatch;

export {};
