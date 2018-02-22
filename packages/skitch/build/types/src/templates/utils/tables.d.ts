export interface HashObject {
    [key: string]: string;
}
export interface FuzzyObject {
    [key: string]: string;
}
export declare const searchTables: (answers: HashObject, input: string) => Promise<{}>;
