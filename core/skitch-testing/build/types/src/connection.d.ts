import * as pgPromise from 'pg-promise';
import { TUtilsConfig } from './types';
export declare const connect: (connection: TUtilsConfig) => Promise<pgPromise.IConnected<any>>;
export declare const close: (db: pgPromise.IConnected<any>) => void;
