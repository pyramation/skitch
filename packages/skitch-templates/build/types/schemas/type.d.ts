import { InquirerQuestion } from 'skitch-types';
export interface TypeConfig {
    schema: string;
    type: string;
}
export declare const requires: (res: TypeConfig) => any[];
export declare const change: ({ schema, type }: TypeConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
