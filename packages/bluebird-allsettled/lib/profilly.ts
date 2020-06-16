import Bluebird from 'bluebird';
import { supportAllSettled } from './supportAllSettled';
import { ITSPromiseSettledResult } from 'ts-type';

const cache = new WeakMap<typeof Bluebird, <R>(values: PromiseLike<R>[]) => Bluebird<Bluebird.Inspection<R>[]>>()

export function profillyBluebirdInspection(lib: typeof Bluebird): (<R>(values: PromiseLike<R>[]) => Bluebird<Bluebird.Inspection<R>[]>) | (<R>(values: PromiseLike<R>[]) => Bluebird<ITSPromiseSettledResult<R>[]>)
{
	if (supportAllSettled(lib))
	{
		return lib.allSettled
	}

	if (!cache.has(lib))
	{
		const fn = <R>(values: PromiseLike<R>[]) => lib.all(values.map((promise) =>
		{
			if (lib.is(promise))
			{
				return (promise as Bluebird<R>).reflect?.() ?? lib.resolve(promise).reflect()
			}

			throw new TypeError(`promise not a PromiseLike, ${promise}`)
		}))

		cache.set(lib, fn)
	}

	return cache.get(lib)
}
