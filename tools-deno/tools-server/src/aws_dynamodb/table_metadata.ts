// Descriptors: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypeDescriptors
export type DynamoTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
};

export interface TableMetadata {
  tableName: string;
  fields: Record<string, keyof DynamoTypeMap>;
}
