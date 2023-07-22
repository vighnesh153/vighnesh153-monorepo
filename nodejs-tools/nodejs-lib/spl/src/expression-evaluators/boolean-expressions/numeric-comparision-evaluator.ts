import { Scope } from '@/models/Scope';
import { getPreviousAndNextNumberOrIdentifier } from '@/helpers/get-previous-and-next-number-or-identifier';

export const numericComparisionEvaluator = (
  text: string,
  identifier: string,
  scope: Scope,
  comparator: (a1: unknown, a2: unknown) => boolean
) => {
  const result = getPreviousAndNextNumberOrIdentifier(text, identifier, scope);
  return text.replace(result.originalExpression, `${comparator(result.prev, result.next)}`);
};
