import assert from 'assert';
import { promiseTapCatch, promiseTapThen } from '../src/index';
import Bluebird from 'bluebird';

function rejection()
{
	const error = new Error("test");
	const rejection = Promise.reject(error);
	// @ts-ignore
	rejection.err = error;
	return rejection;
}

/**
 * @see https://github.com/petkaantonov/bluebird/blob/master/test/mocha/tapCatch.js
 */
describe("tapCatch", function ()
{

	test("passes through rejection reason", function ()
	{
		return promiseTapCatch(rejection(), function ()
		{
			return 3;
		}).catch(function (value)
		{
			assert.equal(value.message, "test");
		});
	});

	test("passes through reason after returned promise is fulfilled", function ()
	{
		var async = false;
		return promiseTapCatch(rejection(), function ()
		{
			return new Promise(function (r)
			{
				setTimeout(function ()
				{
					async = true;
					r(3);
				}, 1);
			});
		}).catch(function (value)
		{
			assert(async);
			assert.equal(value.message, "test");
		});
	});

	test("is not called on fulfilled promise", function ()
	{
		var called = false;
		return promiseTapCatch(Promise.resolve("test"), function ()
		{
			called = true;
		}).then(function (value)
		{
			assert(!called);
		}, assert.fail);
	});

	test("passes immediate rejection", function ()
	{
		var err = new Error();
		return promiseTapThen(promiseTapCatch(rejection(), function ()
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
		return promiseTapThen(promiseTapCatch(rejection(), function ()
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

	test("passes reason", function ()
	{
		return promiseTapCatch(rejection(), function (a)
		{
			assert(a === rejection);
		}).then(assert.fail, function () {});
	});

	test("Works with predicates", function ()
	{
		var called = false;
		return promiseTapCatch(Promise.reject(new TypeError), TypeError, function (err)
		{
			called = true;
			assert(err instanceof TypeError)
		}).then(assert.fail, function (err)
		{
			assert(called === true);
			assert(err instanceof TypeError);
		});
	});
	test("Does not get called on predicates that don't match", function ()
	{
		var called = false;
		return promiseTapCatch(Promise.reject(new TypeError), ReferenceError, function (a)
		{
			called = true;
		}).then(assert.fail, function (err)
		{
			assert(called === false);
			assert(err instanceof TypeError);
		});
	});

	test("Supports multiple predicates", function ()
	{
		var calledA = false;
		var calledB = false;
		var calledC = false;

		var promiseA = promiseTapCatch(Promise.reject(new ReferenceError),
			ReferenceError,
			TypeError,
			function (e)
			{
				assert(e instanceof ReferenceError);
				calledA = true;
			},
		).catch(function () {});

		var promiseB = promiseTapCatch(Promise.reject(new TypeError),
			ReferenceError,
			TypeError,
			function (e)
			{
				assert(e instanceof TypeError);
				calledB = true;
			},
		).catch(function () {});

		var promiseC = promiseTapCatch(Promise.reject(new SyntaxError),
			ReferenceError,
			TypeError,
			function (e)
			{
				calledC = true;
			},
		).catch(function () {});

		return Bluebird.join(promiseA, promiseB, promiseC, function ()
		{
			assert(calledA === true);
			assert(calledB === true);
			assert(calledC === false);
		});
	})
});
