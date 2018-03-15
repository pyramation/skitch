import { TUtilsConfig } from './types';
export declare function dropdb({database, host, password, port, user}: TUtilsConfig): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare function createdb({database, host, password, port, user}: TUtilsConfig): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare function templatedb({database, host, password, port, template, user}: TUtilsConfig): Promise<{
    stdout: string;
    stderr: string;
}>;
export declare const connectionString: ({ database, host, password, port, user }: TUtilsConfig) => string;
