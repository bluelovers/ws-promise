/**
 * Created by user on 2020/5/6.
 */

import Bluebird from 'bluebird';
import { ITSPromiseFulfilledResult, ITSPromiseRejectedResult } from 'ts-type';

export function normalizePromiseSettledResult<R>(promise: Bluebird<R>)
{
	if (promise.isFulfilled?.())
	{
		return {
			status: "fulfilled" as const,
			//reason: void 0 as never,
			value: promise.value(),
		} as ITSPromiseFulfilledResult<R>
	}
	else if (promise.isRejected?.())
	{
		return {
			status: "rejected" as const,
			reason: promise.reason(),
			//value: void 0 as never,
		} as ITSPromiseRejectedResult
	}

	throw new TypeError(`promise not a Bluebird.Inspection, ${promise}`)
}

export default normalizePromiseSettledResult
