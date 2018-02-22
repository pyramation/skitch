import { InquirerQuestion } from '../../types';
export interface UtilityConfig {
    procedure: string;
}
export declare const requires: (res: UtilityConfig) => string[][];
export declare const change: ({ procedure }: UtilityConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
