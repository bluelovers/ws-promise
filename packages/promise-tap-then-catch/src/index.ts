/**
 * @see https://github.com/sindresorhus/p-tap#ptaptaphandler
 */
export function _tapHandler<V extends any>(handler: (value: V, ...argv: any[]) => any)
{
	return async <V2 = V>(value: V2, ...argv) =>
	{
		await handler(value as any, ...argv);
		return value
	}
}

/**
 * @see https://github.com/sindresorhus/p-tap#ptapcatchtaphandler
 */
export function _tapCatchHandler<E extends any = unknown, EC extends Constructor<any> = any>(...inputs: ITapCatchArgvs<EC> | [
	((reason: E,
		...argv: any[]
	) => any)
])
{
	return async (value, ...argv) =>
	{
		const handler = inputs.pop() as (reason: any, ...argv: any[]) => any;

		if (!inputs.length || inputs.some((ec) => value instanceof ec))
		{
			await handler(value, ...argv);
		}

		return Promise.reject(value)
	}
}

/**
 * Essentially like .then(), except that the value passed in is the value returned.
 * @see http://bluebirdjs.com/docs/api/tap.html
 */
export function promiseTapThen<P extends Promise<any>, V extends any = Awaited<P>>(promise: P,
	handler: (value: V, ...argv: any[]) => any,
)
{
	return promise
		.then(_tapHandler(handler)) as P
}

type Constructor<E> = new (...args: any[]) => E;

type ITapCatchArgvs<EC extends Constructor<unknown>> = [...EC[], (reason: EC, ...argv: any[]) => any];

/**
 * .tapCatch is a convenience method for reacting to errors without handling them with promises - similar to finally but only called on rejections. Useful for logging errors.
 * @see http://bluebirdjs.com/docs/api/tapCatch.html
 */
export function promiseTapCatch<P extends Promise<any>, E extends any = unknown, EC extends Constructor<any> = any>(promise: P,
	...inputs: ITapCatchArgvs<EC> | [((reason: E, ...argv: any[]) => any)]
)
{
	return promise
		.catch(_tapCatchHandler(...inputs)) as P
}

export function promiseTapThenCatch<P extends Promise<any>, V extends any = Awaited<P>, E extends any = unknown>(promise: P,
	handlerThen: (value: V, ...argv: any[]) => any,
	handlerCatch?: (reason: E, ...argv: any[]) => any,
): P
{
	promise = promiseTapThen(promise, handlerThen);

	if (typeof handlerCatch !== 'undefined')
	{
		return promiseTapCatch(promise, handlerCatch)
	}

	return promise
}

export function promiseTapLazyBoth<P extends Promise<any>, V extends any = Awaited<P>, E extends any = unknown>(promise: P,
	handlerThen: (value: V, ...argv: any[]) => any,
	handlerCatch?: (reason: E, ...argv: any[]) => any,
)
{
	return promiseTapThenCatch(promise, handlerThen, handlerCatch ?? handlerThen as any)
}

export default promiseTapLazyBoth
