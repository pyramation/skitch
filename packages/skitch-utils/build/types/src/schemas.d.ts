export interface HashObject {
    [key: string]: string;
}
export interface FuzzyObject {
    [key: string]: string;
}
export declare const searchSchemas: (answers: HashObject, input: string) => Promise<{}>;
