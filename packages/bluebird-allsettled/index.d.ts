import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function allSettled<R>(values: PromiseLike<R>[], options?: {
    promise?: typeof Bluebird;
}): Bluebird<ITSPromiseSettledResult<R>[]>;
export default allSettled;
