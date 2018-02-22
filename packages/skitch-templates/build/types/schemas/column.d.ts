import { InquirerQuestion } from 'skitch-types';
export interface ColumnConfig {
    schema: string;
    table: string;
    column: string;
}
export declare const requires: (res: ColumnConfig) => any[];
export declare const change: ({ schema, table, column, }: ColumnConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
