import { InquirerQuestion } from 'skitch-types';
export interface ForeignKeyConfig {
    schema: string;
    table: string;
    reftable: string;
    refschema: string;
    column: string;
}
export declare const requires: (res: ForeignKeyConfig) => any[];
export declare const change: ({ schema, table, column }: ForeignKeyConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
