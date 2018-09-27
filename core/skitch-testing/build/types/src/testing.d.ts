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
    extensions: any;
}>;
export declare const getConnection: (configOpts: any, database: any) => Promise<any>;
export declare const closeConnection: (db: IConnected<any>) => Promise<void>;
export declare const getTestConnection: () => Promise<any>;
export declare const connectTest: (database: any, user: any, password: any) => Promise<any>;
export declare const createUserRole: (db: any, user: any, password: any) => Promise<void>;
export declare const grantConnect: (db: any, user: any) => Promise<void>;
export declare const getConnections: () => Promise<{
    db: any;
    conn: any;
}>;
export declare const closeConnections: ({ db, conn }: {
    db: any;
    conn: any;
}) => Promise<void>;
