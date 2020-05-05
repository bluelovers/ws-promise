import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function profillyBluebirdInspection(lib: typeof Bluebird): (<R>(values: PromiseLike<R>[]) => Bluebird<Bluebird.Inspection<R>>[]) | (<R_1>(values: PromiseLike<R_1>[]) => Bluebird<ITSPromiseSettledResult<R_1, any>[]>);
