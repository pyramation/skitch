import { InquirerQuestion } from 'skitch-types';
export interface GrantSchemaConfig {
    schema: string;
    table: string;
    role: string;
}
export declare const requires: (res: GrantSchemaConfig) => any[];
export declare const change: ({ schema, table, role }: GrantSchemaConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
