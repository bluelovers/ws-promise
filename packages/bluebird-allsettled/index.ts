///<reference lib="es2020" />
import Bluebird from 'bluebird';
import { ITSPromiseSettledResult, ITSPromiseRejectedResult, ITSPromiseFulfilledResult } from 'ts-type';

export function allSettled<R>(values: PromiseLike<R>[], options?: {
	promise?: typeof Bluebird
}): Bluebird<ITSPromiseSettledResult<R>[]>
{
	// @ts-ignore
	return (options?.promise ?? Bluebird).allSettled(values)
		.map(promise => {
			if (promise.isFulfilled())
			{
				return {
					status: "fulfilled" as const,
					//reason: void 0 as never,
					value: promise.value(),
				} as ITSPromiseFulfilledResult<R>
			}
			else
			{
				return {
					status: "rejected" as const,
					reason: promise.reason(),
					//value: void 0 as never,
				} as ITSPromiseRejectedResult
			}
		})
	;
}

export default allSettled
