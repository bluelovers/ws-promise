import Bluebird from 'bluebird';
import Bluebird36 from 'bluebird36';
import { allSettled } from '../index';

test(`allSettled`, async () =>
{

	let actual = await allSettled([
		helloTimeout('juan', 2000),
		helloTimeout('valentina', 1000, true),
		helloTimeout('julian', 3000),
	]);

	expect(actual).toStrictEqual([
		{ status: 'fulfilled', value: 'juan' },
		{ status: 'rejected', reason: 'valentina' },
		{ status: 'fulfilled', value: 'julian' }
	]);
	expect(actual).toMatchSnapshot();

	function helloTimeout<N>(name: N, timeout: any, bool?: any)
	{
		if (bool)
		{
			return Bluebird.reject(name)
		}
		else
		{
			return Bluebird.delay(timeout)
				.then(() =>
				{
					return Bluebird.resolve(name)
				})
		}
	}


});

test(`allSettled:Bluebird36`, async () =>
{

	let actual = await allSettled([
		helloTimeout('juan', 2000),
		helloTimeout('valentina', 1000, true),
		helloTimeout('julian', 3000),
	], {
		promise: Bluebird36,
	});

	expect(actual).toStrictEqual([
		{ status: 'fulfilled', value: 'juan' },
		{ status: 'rejected', reason: 'valentina' },
		{ status: 'fulfilled', value: 'julian' }
	]);
	expect(actual).toMatchSnapshot();

	function helloTimeout<N>(name: N, timeout: any, bool?: any)
	{
		if (bool)
		{
			return Bluebird36.reject(name)
		}
		else
		{
			return Bluebird36.delay(timeout)
				.then(() =>
				{
					return Bluebird36.resolve(name)
				})
		}
	}

});
