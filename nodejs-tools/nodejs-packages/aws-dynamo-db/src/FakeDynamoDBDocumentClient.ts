import type { ServiceInputTypes, ServiceOutputTypes } from '@aws-sdk/lib-dynamodb';
import { Queue } from '@vighnesh153/tools-platform-independent';
import { IDynamoDBDocumentClient } from './IDynamoDBDocumentClient';

import type { Command, MetadataBearer, HttpHandlerOptions } from '@smithy/types';
import type { SmithyResolvedConfiguration } from '@smithy/smithy-client';

export class FakeDynamoDBDocumentClient<
  HandlerOptions = HttpHandlerOptions,
  ClientInput extends object = ServiceInputTypes,
  ClientOutput extends MetadataBearer = ServiceOutputTypes,
> implements IDynamoDBDocumentClient<HandlerOptions, ClientInput, ClientOutput>
{
  sendError: Error | null = null;
  sendReturnValues: Queue<ServiceOutputTypes> = new Queue();
  sendCalledWithArgs:
    | [
        Command<ClientInput, ClientInput, ClientOutput, ClientOutput, SmithyResolvedConfiguration<HandlerOptions>>,
        HandlerOptions?,
      ]
    | null = null;

  async send<InputType extends ClientInput, OutputType extends ClientOutput>(
    command: Command<ClientInput, InputType, ClientOutput, OutputType, SmithyResolvedConfiguration<HandlerOptions>>,
    options?: HandlerOptions
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.sendCalledWithArgs = [command as any, options];
    if (this.sendError != null) {
      throw this.sendError;
    }
    return this.sendReturnValues.popLeft() as OutputType;
  }
}
