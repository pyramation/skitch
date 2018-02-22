import { InquirerQuestion } from '../../types';
export interface TypeConfig {
    schema: string;
    type: string;
}
export declare const requires: (res: TypeConfig) => string[][];
export declare const change: ({ schema, type }: TypeConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
