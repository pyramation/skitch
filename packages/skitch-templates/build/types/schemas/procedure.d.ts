import { InquirerQuestion } from 'skitch-types';
export interface ProcedureConfig {
    schema: string;
    procedure: string;
}
export declare const requires: (res: ProcedureConfig) => string[][];
export declare const change: ({ schema, procedure }: ProcedureConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
