import { number, string } from "joi";

export interface CodeHistory {
  userId: String;
  UpdatedAt: Date;
}

export interface AddCodeInterface {
  title: string;
  tags: Array<string>;
  code: Array<CodeObjectInterface>;
  codeString: string;
  category: string;
  language: string;
  metaData: {
    userId: string;
  };
}

export interface CodeObjectInterface {
  lineNumber: number;
  code: string;
  indentation: number;
}
