import { TUtilsConfig } from '../index';
import pgPromise from 'pg-promise';
export declare const getConnObj: (config?: TUtilsConfig) => TUtilsConfig;
export declare const config: TUtilsConfig;
export declare const getConnStr: (config: TUtilsConfig) => string;
export declare function cleanup(database: string): Promise<void>;
export declare function verifydb(database: string): Promise<void>;
export declare function expectBasicSeed(db: pgPromise.IConnected<any>): Promise<void>;
