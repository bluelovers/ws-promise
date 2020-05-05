import Bluebird from 'bluebird';
import { allSettled } from '../index';

test(`allSettled`, async () =>
{

	let actual = await allSettled([
		helloTimeout('juan', 2000),
		helloTimeout('valentina', 1000, true),
		helloTimeout('julian', 3000),
	]);

	expect(actual).toMatchSnapshot();

});

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
