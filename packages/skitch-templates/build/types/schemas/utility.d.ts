import { InquirerQuestion } from 'skitch-types';
export interface UtilityConfig {
    procedure: string;
}
export declare const requires: (res: UtilityConfig) => any[];
export declare const change: ({ procedure }: UtilityConfig) => any;
declare const questions: Array<InquirerQuestion>;
export default questions;
