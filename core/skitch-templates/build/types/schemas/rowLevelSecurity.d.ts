import { InquirerQuestion } from 'skitch-types';
export interface SecurityConfig {
    schema: string;
    table: string;
    column: string;
}
export declare const requires: (res: SecurityConfig) => string[][];
export declare const change: ({ schema, table, column, }: SecurityConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
