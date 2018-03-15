import { IConnected } from 'pg-promise';
import { TUtilsConfig } from './types';
export interface TestOptions {
    hot?: boolean;
    directory?: string;
    prefix?: string;
    template?: string;
}
export declare const connectTestDb: (config: TUtilsConfig, { hot, template, prefix, directory }: TestOptions) => Promise<IConnected<any>>;
export declare const closeTestDb: (db: IConnected<any>) => Promise<void>;
