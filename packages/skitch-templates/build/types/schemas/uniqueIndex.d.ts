import { InquirerQuestion } from 'skitch-types';
export interface UniqueIndexConfig {
    schema: string;
    table: string;
    index: string;
}
export declare const requires: (res: UniqueIndexConfig) => any[];
export declare const change: ({ schema, table, index }: UniqueIndexConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
