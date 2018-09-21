export declare const listModules: () => Promise<any>;
export declare const latestChange: (sqlmodule: any) => Promise<string>;
export declare const getExtensionsAndModules: (sqlmodule: any) => Promise<{
    native: any;
    sqitch: any;
}>;
export declare const getExtensionsAndModulesChanges: (sqlmodule: any) => Promise<{
    native: any;
    sqitch: any;
}>;
