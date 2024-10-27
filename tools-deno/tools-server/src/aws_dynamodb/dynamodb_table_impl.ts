import { PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoTypeMap, TableMetadata } from "./table_metadata.ts";
import type {
  DynamoDBTable,
  OptionalCreateOne,
  OptionalGetOne,
} from "./dynamodb_table.ts";
import type { IDynamoDBDocumentClient } from "./dynamodb_document_client.ts";

export class DynamoDBTableImpl<T extends TableMetadata>
  implements DynamoDBTable<T> {
  constructor(
    private client: IDynamoDBDocumentClient,
    private tableMetadata: T,
  ) {}

  // deno-lint-ignore require-await
  async queryOne<
    TKey extends keyof T["fields"],
    TFilterBy extends keyof T["fields"],
  >(params: {
    filterBy: {
      [key in TFilterBy]: {
        value: DynamoTypeMap[T["fields"][key]];
        filterExpression?: (key: string) => string;
      };
    };
  }): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T["fields"][key]] }>
  > {
    return this.fetchOne(params, "query");
  }

  // deno-lint-ignore require-await
  async scanOne<
    TKey extends keyof T["fields"],
    TFilterBy extends keyof T["fields"],
  >(params: {
    filterBy: {
      [key in TFilterBy]: {
        value: DynamoTypeMap[T["fields"][key]];
        filterExpression?: (key: string) => string;
      };
    };
  }): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T["fields"][key]] }>
  > {
    return this.fetchOne(params, "scan");
  }

  async createOne<TField extends keyof T["fields"]>(params: {
    data: { [key in TField]: DynamoTypeMap[T["fields"][key]] };
  }): Promise<OptionalCreateOne> {
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableMetadata.tableName,
          Item: params.data,
        }),
      );
      return { error: null };
    } catch (e) {
      return {
        error: {
          message: "CREATION_FAILED",
          errorObject: e,
        },
      };
    }
  }

  private async fetchOne<
    TKey extends keyof T["fields"],
    TFilterBy extends keyof T["fields"],
  >(
    params: {
      filterBy: {
        [key in TFilterBy]: {
          value: DynamoTypeMap[T["fields"][key]];
          filterExpression?: (key: string) => string;
        };
      };
    },
    type: "scan" | "query",
  ): Promise<
    OptionalGetOne<{ [key in TKey]: DynamoTypeMap[T["fields"][key]] }>
  > {
    const keys = Object.keys(params.filterBy) as Array<TFilterBy>;
    const expressionAttributeValues = keys
      // Expected attribute values format:
      // { ":email": "email@email.com", ":age": 25 }
      .reduce(
        (exprAttrValues, key) => {
          const { value } = params.filterBy[key];
          const formattedKey = `:${String(key)}`;
          switch (typeof value) {
            case "number":
            case "string":
              exprAttrValues[formattedKey] = value;
              break;
            default:
              throw new Error(`Unknown value type: "${typeof value}"`);
          }
          return exprAttrValues;
        },
        {} as Record<string, unknown>,
      );
    const conditionExpression = (keys as string[])
      .map((key) => {
        const { filterExpression = equalityFilterExpression } =
          params.filterBy[key as TFilterBy];
        return filterExpression(key);
      })
      .join(" and ");
    const command = (() => {
      if (type == "query") {
        return new QueryCommand({
          TableName: this.tableMetadata.tableName,
          KeyConditionExpression: conditionExpression,
          ExpressionAttributeValues: expressionAttributeValues,
        });
      }
      if (type == "scan") {
        return new ScanCommand({
          TableName: this.tableMetadata.tableName,
          FilterExpression: conditionExpression,
          ExpressionAttributeValues: expressionAttributeValues,
        });
      }
      throw new Error(
        `Invalid fetch type. Should be either scan or query, found: '${type}'`,
      );
    })();
    try {
      const result = await this.client.send(command);
      const item = result.Items?.[0] ?? null;
      if (item != null) {
        return {
          // deno-lint-ignore no-explicit-any
          data: item as any,
          error: null,
        };
      }
      return {
        data: null,
        error: {
          message: "OBJECT_NOT_FOUND",
          errorObject: null,
        },
      };
    } catch (e) {
      return {
        data: null,
        error: {
          message: "ERROR_WHILE_FETCHING",
          errorObject: e,
        },
      };
    }
  }
}

function equalityFilterExpression(key: string): string {
  return `${key} = :${key}`;
}
