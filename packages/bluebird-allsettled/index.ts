///<reference lib="es2020" />
import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
import { normalizePromiseSettledResult } from './lib/normalizePromiseSettledResult';
import { profillyBluebirdInspection } from './lib/profilly';

export function allSettled<R>(values: PromiseLike<R>[], options?: {
	promise?: typeof Bluebird
}): Bluebird<ITSPromiseSettledResult<R>[]>
{
	// @ts-ignore
	return profillyBluebirdInspection(options?.promise ?? Bluebird)(values)
		.map(promise => normalizePromiseSettledResult(promise))
	;
}

export default allSettled
