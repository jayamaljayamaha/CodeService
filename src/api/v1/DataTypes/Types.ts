export interface CodeHistory {
  userId: String;
  UpdatedAt: Date;
}

export interface AddCodeInterface {
  title: string;
  tags: Array<string>;
  code: string;
  category: string;
  subCategory: string;
  language: string;
  metaData: {
    userId: string;
  };
}
