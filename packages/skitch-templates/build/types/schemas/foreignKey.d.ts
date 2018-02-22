import { InquirerQuestion } from 'skitch-types';
export interface ForeignKeyConfig {
    schema: string;
    table: string;
    reftable: string;
    refschema: string;
    column: string;
}
export declare const requires: (res: ForeignKeyConfig) => string[][];
export declare const change: ({ schema, table, column }: ForeignKeyConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
