export type ChangePathArray = Array<string>;
export interface InquirerQuestion {
  name: string;
  type: string;
  message: string;
  required: boolean;
  
  // source?: (answers: HashObject, input: string);
  [key: string]: any;
}
