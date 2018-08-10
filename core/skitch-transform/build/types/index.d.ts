export interface ObjectHash {
    [type: string]: string;
}
export interface ReplaceHash {
    [type: string]: Function | ObjectHash;
}
export declare const transformProps: (obj: any, props: ReplaceHash) => any;
export declare const transform: (statement: string, props: ReplaceHash) => any;
