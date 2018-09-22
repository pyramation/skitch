export declare const makePlan: (packageDir: any, options: any) => Promise<string>;
export declare const getPlan: ({ name, ...rest }: {
    [x: string]: any;
    name: any;
}) => Promise<string>;
