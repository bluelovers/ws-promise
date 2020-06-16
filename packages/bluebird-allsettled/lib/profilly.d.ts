import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function profillyBluebirdInspection(lib: typeof Bluebird): (<R>(values: PromiseLike<R>[]) => Bluebird<ITSPromiseSettledResult<R, any>[]>) | (<R_1>(values: PromiseLike<R_1>[]) => Bluebird<Bluebird.Inspection<R_1>[]>);
