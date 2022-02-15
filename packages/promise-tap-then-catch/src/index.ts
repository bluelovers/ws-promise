export function promiseTapThen<P extends Promise<any>, V extends any = Awaited<P>>(promise: P,
	handler: (value: V, ...argv: any[]) => any,
)
{
	return promise
		.then(async (value, ...argv) =>
		{
			await handler(value, ...argv);
			return value
		}) as P
}

type Constructor<E> = new (...args: any[]) => E;

type ITapCatchArgvs<EC extends Constructor<unknown>> = [...EC[], (reason: EC, ...argv: any[]) => any];

export function promiseTapCatch<P extends Promise<any>, E extends any = any, EC extends Constructor<any> = any>(promise: P,
	...inputs: ITapCatchArgvs<EC> | [((reason: E, ...argv: any[]) => any)]
)
{
	return promise
		.catch(async (value, ...argv) =>
		{
			const handler = inputs.pop() as (reason: any, ...argv: any[]) => any;

			if (!inputs.length || inputs.some((ec) => value instanceof ec))
			{
				await handler(value, ...argv);
			}

			return Promise.reject(value)
		}) as P
}

export function promiseTapThenCatch<P extends Promise<any>, V extends any = Awaited<P>, E extends any = any>(promise: P,
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

export default promiseTapThenCatch
