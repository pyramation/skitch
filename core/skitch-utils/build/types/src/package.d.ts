export declare const cleanTree: (tree: any) => any;
export declare const packageModule: (extension?: boolean) => Promise<{
    sql: string;
} | undefined>;
export declare const writePackage: (version: any, extension?: boolean) => Promise<void>;
