export type DynamoTypeMap = {
  string: string;
  number: number;
};

export interface TableMetadata {
  tableName: string;
  fields: Record<string, keyof DynamoTypeMap>;
}
