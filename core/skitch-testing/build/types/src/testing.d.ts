import { IConnected } from 'pg-promise';
export interface TestOptions {
    hot?: boolean;
    directory?: string;
    prefix?: string;
    template?: string;
}
export declare const getOpts: (configOpts: any) => Promise<{
    user: any;
    password: any;
    port: any;
    host: any;
    hot: any;
    template: any;
    prefix: any;
    directory: any;
}>;
export declare const getConnection: (configOpts: any, database: any) => Promise<any>;
export declare const closeConnection: (db: IConnected<any>) => Promise<void>;
export declare const truncateTables: (db: IConnected<any>) => Promise<void>;
