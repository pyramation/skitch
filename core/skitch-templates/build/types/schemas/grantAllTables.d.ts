import { InquirerQuestion } from 'skitch-types';
export interface GrantAllTables {
    schema: string;
    role: string;
}
export declare const requires: (res: GrantAllTables) => string[][];
export declare const change: ({ schema, role }: GrantAllTables) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
