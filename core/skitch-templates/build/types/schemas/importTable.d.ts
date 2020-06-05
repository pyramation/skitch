import { InquirerQuestion } from 'skitch-types';
export interface TableConfig {
    schema: string;
    table: string;
}
export declare const requires: (res: TableConfig) => string[][];
export declare const change: ({ schema, table }: TableConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
