import { IConnected } from 'pg-promise';
export interface TestOptions {
    hot?: boolean;
    directory?: string;
    prefix?: string;
    template?: string;
}
export declare const getConnection: (configOpts: any) => Promise<any>;
export declare const closeConnection: (db: IConnected<any>) => Promise<void>;
export declare const truncateTables: (db: IConnected<any>) => Promise<void>;
