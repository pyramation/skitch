export declare const getDeps: (packageDir: any) => Promise<{
    external: any[];
    resolved: string[];
    deps: {
        [type: string]: any;
    };
}>;
