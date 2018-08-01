export interface ObjHash {
    [key: string]: string[];
}
export declare const resolve: (pkgDir?: string, scriptType?: string) => Promise<string>;
