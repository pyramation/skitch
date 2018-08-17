import { InquirerQuestion } from 'skitch-types';
export interface ExtensionConfig {
    extension: string;
}
export declare const requires: (res: ExtensionConfig) => string[][];
export declare const change: ({ extension, }: ExtensionConfig) => string[];
declare const questions: Array<InquirerQuestion>;
export default questions;
