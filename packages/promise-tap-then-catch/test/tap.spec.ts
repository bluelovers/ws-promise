import { promiseTapThen } from '../src/index';
import assert from 'assert';

/**
 * @see https://github.com/petkaantonov/bluebird/blob/master/test/mocha/tap.js
 */
describe("tap", function ()
{
	test("passes through value", function ()
	{
		return expect(promiseTapThen(Promise.resolve("test"), function ()
		{
			return 3;
		})).resolves.toStrictEqual("test");
	});

	test("passes through value after returned promise is fulfilled", function ()
	{
		var async = false;
		return promiseTapThen(Promise.resolve("test"), function ()
		{
			return new Promise(function (r)
			{
				setTimeout(function ()
				{
					async = true;
					r(3);
				}, 1);
			});
		}).then(function (value)
		{
			assert(async);
			assert.equal(value, "test");
		});
	});

	test("is not called on rejected promise", function ()
	{
		var called = false;
		return promiseTapThen(Promise.reject("test"), function ()
		{
			called = true;
		}).then(assert.fail, function (value)
		{
			assert(!called);
		});
	});

	test("passes immediate rejection", function ()
	{
		var err = new Error();
		return promiseTapThen(promiseTapThen(Promise.resolve("test"), function ()
		{
			throw err;
		}), assert.fail).then(assert.fail, function (e)
		{
			assert(err === e);
		});
	});

	test("passes eventual rejection", function ()
	{
		var err = new Error();
		return promiseTapThen(promiseTapThen(Promise.resolve("test"), function ()
		{
			return new Promise(function (_, rej)
			{
				setTimeout(function ()
				{
					rej(err);
				}, 1)
			});
		}), assert.fail).then(assert.fail, function (e)
		{
			assert(err === e);
		});
	});

	test("passes value", function ()
	{
		return promiseTapThen(Promise.resolve(123), function (a)
		{
			assert(a === 123);
		});
	});
});
