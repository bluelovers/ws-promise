/**
 * Created by user on 2020/5/6.
 */
import Bluebird from 'bluebird';
import { ITSPromiseFulfilledResult, ITSPromiseRejectedResult } from 'ts-type';
export declare function normalizePromiseSettledResult<R>(promise: Bluebird<R>): ITSPromiseRejectedResult<any> | ITSPromiseFulfilledResult<R>;
export default normalizePromiseSettledResult;
