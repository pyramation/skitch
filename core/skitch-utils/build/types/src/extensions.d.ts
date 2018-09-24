export declare const getAvailableExtensions: () => Promise<any>;
export declare const getExtensionInfo: () => Promise<{
    extname: any;
    sqitchPath: string[];
    version: any;
    Makefile: string;
    controlFile: string;
    sqlFile: string;
}>;
export declare const getInstalledExtensions: () => Promise<any>;
export declare const writeExtensionMakefile: ({ path, extname, version }: {
    path: any;
    extname: any;
    version: any;
}) => Promise<void>;
export declare const writeExtensionControlFile: ({ path, extname, extensions, version }: {
    path: any;
    extname: any;
    extensions: any;
    version: any;
}) => Promise<void>;
export declare const writeExtensions: (extensions: any) => Promise<void>;
export declare const writeExtensionsToEnv: () => Promise<void>;
