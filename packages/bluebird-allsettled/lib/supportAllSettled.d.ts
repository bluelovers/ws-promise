/**
 * Created by user on 2020/5/6.
 */
import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function supportAllSettled(lib: typeof Bluebird): lib is typeof Bluebird & {
    allSettled<R>(values: PromiseLike<R>[]): Bluebird<ITSPromiseSettledResult<R>[]>;
};
