import { IConnected } from 'pg-promise';
export interface TestOptions {
    hot?: boolean;
    directory?: string;
    prefix?: string;
    template?: string;
}
export declare const getConnection: ({ user, password, port, host, hot, template, prefix, directory, }: TestOptions) => Promise<any>;
export declare const closeConnection: (db: IConnected<any>) => Promise<void>;
