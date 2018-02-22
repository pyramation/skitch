import { InquirerQuestion } from 'skitch-types';
export interface ProcedureConfig {
    schema: string;
    procedure: string;
}
export declare const requires: (res: ProcedureConfig) => any[];
export declare const change: ({ schema, procedure }: ProcedureConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
