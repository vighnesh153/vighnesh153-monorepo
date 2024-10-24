import { Scope } from "@/models/Scope";
import { getPreviousAndNextNumberOrIdentifier } from "@/helpers/get-previous-and-next-number-or-identifier";

export const arithmeticOperationEvaluator = (
  text: string,
  identifier: string,
  scope: Scope,
  performOperation: (a1: unknown, a2: unknown) => number,
) => {
  const result = getPreviousAndNextNumberOrIdentifier(text, identifier, scope);
  return text.replace(
    result.originalExpression,
    `${performOperation(result.prev, result.next)}`,
  );
};
