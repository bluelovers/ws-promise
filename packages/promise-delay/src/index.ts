export function promiseDelay<T>(ms: number, value: T)
{
	return new Promise<T>(function (resolve)
	{
		setTimeout(function ()
		{
			resolve(value)
		}, ms)
	})
}

export function promiseDelayReject(ms: number, value: unknown)
{
	return new Promise(function (_resolve, reject)
	{
		setTimeout(function ()
		{
			reject(value)
		}, ms)
	})
}

export default promiseDelay
