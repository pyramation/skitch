import { InquirerQuestion } from 'skitch-types';
export interface UniqueIndexConfig {
    schema: string;
    table: string;
    index: string;
}
export declare const requires: (res: UniqueIndexConfig) => string[][];
export declare const change: ({ schema, table, index }: UniqueIndexConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
