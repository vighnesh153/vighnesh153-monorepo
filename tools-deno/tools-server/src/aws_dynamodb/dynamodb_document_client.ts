import type {
  Command,
  HttpHandlerOptions,
  MetadataBearer,
} from "@smithy/types";
import type { SmithyResolvedConfiguration } from "@smithy/smithy-client";
import type {
  ServiceInputTypes,
  ServiceOutputTypes,
} from "@aws-sdk/lib-dynamodb";

export interface IDynamoDBDocumentClient<
  HandlerOptions = HttpHandlerOptions,
  ClientInput extends object = ServiceInputTypes,
  ClientOutput extends MetadataBearer = ServiceOutputTypes,
> {
  send<InputType extends ClientInput, OutputType extends ClientOutput>(
    command: Command<
      ClientInput,
      InputType,
      ClientOutput,
      OutputType,
      SmithyResolvedConfiguration<HandlerOptions>
    >,
    options?: HandlerOptions,
  ): Promise<OutputType>;
}
