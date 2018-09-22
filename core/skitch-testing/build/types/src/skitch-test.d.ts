export interface TestOptions {
    user?: string;
    password?: string;
    port?: string;
    host?: string;
    hot?: boolean;
    template?: string;
    prefix?: string;
    directory?: string;
}
export declare class TestDatabase {
    options: object;
    constructor(options?: object);
    init(extensions?: never[]): Promise<void>;
    getConnection(): Promise<any>;
    close(): Promise<void>;
}
