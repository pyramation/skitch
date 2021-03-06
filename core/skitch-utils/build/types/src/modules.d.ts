export declare const listModules: () => Promise<any>;
export declare const _clearModuleCache: () => void;
export declare const latestChange: (sqlmodule: any) => Promise<string>;
export declare const latestChangeAndVersion: (sqlmodule: any) => Promise<{
    change: string;
    version: any;
}>;
export declare const getExtensionsAndModules: (sqlmodule: any) => Promise<{
    native: any;
    sqitch: any;
}>;
export declare const getExtensionsAndModulesChanges: (sqlmodule: any) => Promise<{
    native: any;
    sqitch: any;
}>;
