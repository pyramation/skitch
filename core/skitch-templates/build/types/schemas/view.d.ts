import { InquirerQuestion } from 'skitch-types';
export interface ViewConfig {
    schema: string;
    view: string;
}
export declare const requires: (res: ViewConfig) => string[][];
export declare const change: ({ schema, view }: ViewConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
