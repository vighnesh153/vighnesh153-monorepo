import { Resource } from "sst";

import {
  createDynamoDBDocumentClient,
  DynamoDBTable,
  DynamoDBTableImpl,
  IDynamoDBDocumentClient,
  TableMetadata,
} from "@vighnesh153/tools-server/aws_dynamodb";
import { createSingletonFactory } from "@vighnesh153/tools";
import {
  filesMetadataFields,
  userInfoFields,
} from "../dynamo_db_table_metadata";
import { inProduction } from "../utils";

const dynamoDBDocumentClientSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    IDynamoDBDocumentClient
  >(() => {
    return createDynamoDBDocumentClient();
  });

/**
 * User Info table
 */
export const userInfoTableMetadata = /* @__PURE__ */ {
  fields: userInfoFields,
  // @ts-ignore: sst stuff
  tableName: /* @__PURE__ */ inProduction(() => Resource.UserInfoTable.name),
} satisfies TableMetadata;

export const userInfoTableSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    DynamoDBTable<typeof userInfoTableMetadata>
  >(() => {
    const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
    return new DynamoDBTableImpl(dynamoDBdocumentClient, userInfoTableMetadata);
  });

/**
 * Private files metadata table
 */
export const privateFilesMetadataTableMetadata = /* @__PURE__ */ {
  fields: filesMetadataFields,
  tableName: /* @__PURE__ */ inProduction(() =>
    // @ts-ignore: sst stuff
    Resource.PrivateFilesMetadataTable.name
  ),
} satisfies TableMetadata;

export const privateFilesMetadataTableSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    DynamoDBTable<typeof privateFilesMetadataTableMetadata>
  >(() => {
    const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
    return new DynamoDBTableImpl(
      dynamoDBdocumentClient,
      privateFilesMetadataTableMetadata,
    );
  });

/**
 * Public files metadata table
 */
export const publicFilesMetadataTableMetadata = /* @__PURE__ */ {
  fields: filesMetadataFields,
  tableName: /* @__PURE__ */ inProduction(() =>
    // @ts-ignore: sst stuff
    Resource.PublicFilesMetadataTable.name
  ),
} satisfies TableMetadata;

export const publicFilesMetadataTableSingletonFactory =
  /* @__PURE__ */ createSingletonFactory<
    DynamoDBTable<typeof publicFilesMetadataTableMetadata>
  >(() => {
    const dynamoDBdocumentClient = dynamoDBDocumentClientSingletonFactory();
    return new DynamoDBTableImpl(
      dynamoDBdocumentClient,
      publicFilesMetadataTableMetadata,
    );
  });
