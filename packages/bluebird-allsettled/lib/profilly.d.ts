import Bluebird from 'bluebird';
import { ITSPromiseSettledResult } from 'ts-type';
export declare function profillyBluebirdInspection(lib: typeof Bluebird): (<R>(values: PromiseLike<R>[]) => Bluebird<Bluebird.Inspection<R>[]>) | (<R>(values: PromiseLike<R>[]) => Bluebird<ITSPromiseSettledResult<R>[]>);
