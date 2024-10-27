import { Scope } from "@/models/Scope";

export abstract class ExpressionEvaluator {
  abstract scope: Scope;

  abstract tryEvaluate(text: string): boolean;
  abstract evaluate(text: string): unknown;
}
