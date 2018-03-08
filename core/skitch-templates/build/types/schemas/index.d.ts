import { InquirerQuestion } from 'skitch-types';
export interface IndexConfig {
    schema: string;
    table: string;
    index: string;
}
export declare const requires: (res: IndexConfig) => string[][];
export declare const change: ({ schema, table, index }: IndexConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
