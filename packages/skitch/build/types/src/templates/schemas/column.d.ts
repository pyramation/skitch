import { InquirerQuestion } from '../../types';
export interface ColumnConfig {
    schema: string;
    table: string;
    column: string;
}
export declare const requires: (res: ColumnConfig) => string[][];
export declare const change: ({ schema, table, column }: ColumnConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
