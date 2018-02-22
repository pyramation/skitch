export interface SkitchOptions {
    baseDir: string;
}
export declare class Skitch {
    baseDir: string;
    projectDir: string;
    constructor(baseDir?: string);
    getconf(): void;
    init(): void;
    registerTemplate(template: any): void;
}
