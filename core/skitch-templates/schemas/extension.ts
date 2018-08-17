import { ChangePathArray, InquirerQuestion } from 'skitch-types';

export interface ExtensionConfig {
  extension: string;
}

export const requires = (res: ExtensionConfig): Array<ChangePathArray> => [

];

export const change = ({
  extension,
}: ExtensionConfig): ChangePathArray => [
  'extensions',
  extension
];

const questions: Array<InquirerQuestion> = [
  {
    type: 'string',
    name: 'extension',
    message: 'enter a extension name',
    required: true,
  },
];

export default questions;
