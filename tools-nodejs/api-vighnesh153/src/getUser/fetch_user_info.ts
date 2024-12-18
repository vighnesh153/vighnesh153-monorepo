import {
  CompleteUserInfo,
  convertToPublicUserInfo,
  Logger,
  PublicUserInfo,
} from "@vighnesh153/tools";
import type { DynamoDBTable } from "@vighnesh153/tools-server/aws_dynamodb";
import { userInfoTableMetadata } from "../common/factories/mod.ts";

export async function getPublicUserInfo({
  userId,
  userInfoDynamoTable,
  logger,
}: {
  userId: string;
  userInfoDynamoTable: DynamoDBTable<typeof userInfoTableMetadata>;
  logger: Logger;
}): Promise<PublicUserInfo | null> {
  const completeUserInfo = await getCompleteUserInfo({
    userId,
    userInfoDynamoTable,
    logger,
  });

  if (completeUserInfo == null) {
    logger.log(`Failed to get logged in user info`);
    return null;
  }
  return convertToPublicUserInfo(completeUserInfo);
}

export async function getCompleteUserInfo({
  userId,
  userInfoDynamoTable,
  logger,
}: {
  userId: string;
  userInfoDynamoTable: DynamoDBTable<typeof userInfoTableMetadata>;
  logger: Logger;
}): Promise<CompleteUserInfo | null> {
  const res = await userInfoDynamoTable.scanOne({
    filterBy: {
      userId: { value: userId },
    },
  });
  if (res.error != null) {
    logger.log(
      `Some error occurred when fetching complete user info. ${res.error.message}`,
      res.error.errorObject,
    );
    return null;
  }
  logger.log(`Successfully fetched user info`, res.data);
  return res.data;
}
