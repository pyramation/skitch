import { InquirerQuestion } from 'skitch-types';
export interface SchemaConfig {
    refproject: string;
    refchange: string;
}
export declare const change: ({ refproject, refchange }: SchemaConfig) => string[];
export declare const requires: (res: SchemaConfig) => string[][];
declare const questions: Array<InquirerQuestion>;
export default questions;
