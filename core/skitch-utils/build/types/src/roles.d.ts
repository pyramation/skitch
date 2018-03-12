export interface HashObject {
    schema: string;
    [key: string]: string;
}
export interface FuzzyObject {
    [key: string]: string;
}
export declare const searchRoles: (answers: HashObject, input: string) => Promise<{}>;
