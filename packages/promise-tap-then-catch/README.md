# README.md

    Tap a promise chain without affecting its value or state

## install

```bash
yarn add promise-tap-then-catch
yarn-tool add promise-tap-then-catch
yt add promise-tap-then-catch
```

```typescript
/**
 * Essentially like .then(), except that the value passed in is the value returned.
 * @see http://bluebirdjs.com/docs/api/tap.html
 */
export declare function promiseTapThen<P extends Promise<any>, V extends any = Awaited<P>>(promise: P,
	handler: (value: V, ...argv: any[]) => any
): P;

export declare type Constructor<E> = new (...args: any[]) => E;
export declare type ITapCatchArgvs<EC extends Constructor<unknown>> = [
	...EC[],
	(reason: EC, ...argv: any[]) => any
];

/**
 * .tapCatch is a convenience method for reacting to errors without handling them with promises - similar to finally but only called on rejections. Useful for logging errors.
 * @see http://bluebirdjs.com/docs/api/tapCatch.html
 */
export declare function promiseTapCatch<P extends Promise<any>, E extends any = unknown, EC extends Constructor<any> = any>(promise: P,
	...inputs: ITapCatchArgvs<EC> | [
		((reason: E, ...argv: any[]) => any)
	]
): P;

export declare function promiseTapThenCatch<P extends Promise<any>, V extends any = Awaited<P>, E extends any = unknown>(promise: P,
	handlerThen: (value: V, ...argv: any[]) => any,
	handlerCatch?: (reason: E, ...argv: any[]) => any
): P;

export declare function promiseTapLazyBoth<P extends Promise<any>, V extends any = Awaited<P>, E extends any = unknown>(promise: P,
	handlerThen: (value: V, ...argv: any[]) => any,
	handlerCatch?: (reason: E, ...argv: any[]) => any
): P;

export default promiseTapLazyBoth;
```
