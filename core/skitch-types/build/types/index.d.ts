export declare type ChangePathArray = Array<string>;
export interface InquirerQuestion {
    name: string;
    type: string;
    message: string;
    required: boolean;
    [key: string]: any;
}
