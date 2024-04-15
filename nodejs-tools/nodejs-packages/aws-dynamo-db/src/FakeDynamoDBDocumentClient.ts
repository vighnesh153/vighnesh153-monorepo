import { AWSError, DynamoDB, Request, Service } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class FakeDynamoDBDocumentClient implements DynamoDB.DocumentClient {
  createSetResult: DynamoDB.DocumentClient.DynamoDbSet = { type: 'Number', values: [] };

  batchGetResult: Request<DynamoDB.DocumentClient.BatchGetItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.BatchGetItemOutput,
    AWSError
  >(new Service({}), '');

  batchWriteResult: Request<DynamoDB.DocumentClient.BatchWriteItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.BatchWriteItemOutput,
    AWSError
  >(new Service({}), '');

  deleteResult: Request<DynamoDB.DocumentClient.DeleteItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.DeleteItemOutput,
    AWSError
  >(new Service({}), '');

  getResult: Request<DynamoDB.DocumentClient.GetItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.GetItemOutput,
    AWSError
  >(new Service({}), '');

  putCalledWithArgs: DocumentClient.PutItemInput = { TableName: '', Item: {} };

  putError: Error | null = null;

  putResult: Request<DynamoDB.DocumentClient.PutItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.PutItemOutput,
    AWSError
  >(new Service({}), '');

  queryCalledWithArgs: DocumentClient.QueryInput = { TableName: '' };

  queryError: Error | null = null;

  queryResult: Request<DynamoDB.DocumentClient.QueryOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.QueryOutput,
    AWSError
  >(new Service({}), '');

  scanResult: Request<DynamoDB.DocumentClient.ScanOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.ScanOutput,
    AWSError
  >(new Service({}), '');

  updateResult: Request<DynamoDB.DocumentClient.UpdateItemOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.UpdateItemOutput,
    AWSError
  >(new Service({}), '');

  transactGetResult: Request<DynamoDB.DocumentClient.TransactGetItemsOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.TransactGetItemsOutput,
    AWSError
  >(new Service({}), '');

  transactWriteResult: Request<DynamoDB.DocumentClient.TransactWriteItemsOutput, AWSError> = new Request<
    DynamoDB.DocumentClient.TransactWriteItemsOutput,
    AWSError
  >(new Service({}), '');

  createSet(): DynamoDB.DocumentClient.DynamoDbSet {
    return this.createSetResult;
  }

  batchGet(): Request<DynamoDB.DocumentClient.BatchGetItemOutput, AWSError> {
    return this.batchGetResult;
  }

  batchWrite(): Request<DynamoDB.DocumentClient.BatchWriteItemOutput, AWSError> {
    return this.batchWriteResult;
  }

  delete(): Request<DynamoDB.DocumentClient.DeleteItemOutput, AWSError> {
    return this.deleteResult;
  }

  get(): Request<DynamoDB.DocumentClient.GetItemOutput, AWSError> {
    return this.getResult;
  }

  put(params: DocumentClient.PutItemInput): Request<DynamoDB.DocumentClient.PutItemOutput, AWSError> {
    this.putCalledWithArgs = params;
    if (this.putError !== null) {
      throw this.putError;
    }
    return this.putResult;
  }

  query(params: DocumentClient.QueryInput): Request<DynamoDB.DocumentClient.QueryOutput, AWSError> {
    this.queryCalledWithArgs = params;
    if (this.queryError !== null) {
      throw this.queryError;
    }
    return this.queryResult;
  }

  scan(): Request<DynamoDB.DocumentClient.ScanOutput, AWSError> {
    return this.scanResult;
  }

  update(): Request<DynamoDB.DocumentClient.UpdateItemOutput, AWSError> {
    return this.updateResult;
  }

  transactGet(): Request<DynamoDB.DocumentClient.TransactGetItemsOutput, AWSError> {
    return this.transactGetResult;
  }

  transactWrite(): Request<DynamoDB.DocumentClient.TransactWriteItemsOutput, AWSError> {
    return this.transactWriteResult;
  }
}
