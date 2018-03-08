import { InquirerQuestion } from 'skitch-types';
export interface GrantSchemaConfig {
    schema: string;
    table: string;
    role: string;
}
export declare const requires: (res: GrantSchemaConfig) => string[][];
export declare const change: ({ schema, table, role }: GrantSchemaConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
