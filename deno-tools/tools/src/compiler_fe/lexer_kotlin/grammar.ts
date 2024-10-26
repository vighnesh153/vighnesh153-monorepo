import { ALPHABET, DIGITS, not } from "@/utils/mod.ts";
import { KotlinTokenType, operatorTokens } from "./tokens.ts";

class StateMachineNode {
  fallbackNode: StateMachineNode | null = null;
  tokenType: KotlinTokenType | null = null;
  private nextStates = new Map<string, StateMachineNode>();

  get isTerminal(): boolean {
    return this.tokenType !== null;
  }

  constructor(readonly currState: string) {}

  isVisitable(state: string): boolean {
    return this.nextStates.has(state) || this.fallbackNode !== null;
  }

  getVisitableState(state: string): StateMachineNode {
    if (not(this.isVisitable(state))) {
      throw new Error(
        `getVisitableState called with '${state}' that is not possible to visit`,
      );
    }
    return this.nextStates.get(state)! || this.fallbackNode!;
  }

  createVisitableState(node: StateMachineNode): void {
    this.nextStates.set(node.currState, node);
  }
}

function constructOperatorsGrammar(root: StateMachineNode) {
  for (const operatorToken of operatorTokens) {
    const literal = operatorToken.value;
    let intermediateNode = root;
    for (let i = 0; i < literal.length; i++) {
      const state = literal[i];
      if (not(intermediateNode.isVisitable(state))) {
        intermediateNode.createVisitableState(new StateMachineNode(state));
      }
      intermediateNode = intermediateNode.getVisitableState(state);
    }
    intermediateNode.tokenType = operatorToken;
  }
}

function constructIdentifierGrammar(root: StateMachineNode) {
  const startCharacters = ALPHABET + "_";
  const allCharacters = startCharacters + DIGITS;

  const charToNode = Array.from(allCharacters).reduce((acc, ch) => {
    const node = new StateMachineNode(ch);
    acc.set(ch, node);
    node.tokenType = KotlinTokenType.Identifier;
    return acc;
  }, new Map<string, StateMachineNode>());

  // create mapping between all characters
  for (let i = 0; i < allCharacters.length; i++) {
    const currState = charToNode.get(startCharacters[i])!;

    for (let j = 0; j < allCharacters.length; j++) {
      const state = allCharacters[j];
      const nextState = charToNode.get(state)!;
      currState.createVisitableState(nextState);
    }
  }

  // link all start characters to root
  for (let i = 0; i < startCharacters.length; i++) {
    const state = startCharacters[i];
    const node = charToNode.get(state)!;
    root.createVisitableState(node);
  }
}

function constructCommentsGrammar(root: StateMachineNode) {
  let node = root;
  if (not(root.isVisitable("/"))) {
    node.createVisitableState(new StateMachineNode("/"));
  }
  node = node.getVisitableState("/");

  // single line
  if (not(root.isVisitable("/"))) {
    node.createVisitableState(new StateMachineNode("/"));
  }
  node = node.getVisitableState("/");
  node.tokenType = KotlinTokenType.SingleLineComment;
  node.fallbackNode = node;
  const newLineNode = new StateMachineNode("\n");
  newLineNode.tokenType = KotlinTokenType.SingleLineComment;
  node.createVisitableState(newLineNode);

  // multi line
  node = root.getVisitableState("/");
  if (not(root.isVisitable("*"))) {
    node.createVisitableState(new StateMachineNode("*"));
  }
  const startStarNode = node.getVisitableState("*");
  const endStarNode = new StateMachineNode("*");
  endStarNode.fallbackNode = startStarNode;
  startStarNode.createVisitableState(endStarNode);
  const endForwardSlashNode = new StateMachineNode("/");
  endForwardSlashNode.tokenType = KotlinTokenType.MultiLineComment;
  endStarNode.createVisitableState(endForwardSlashNode);
}

function constructIntegerOrLongGrammar(root: StateMachineNode) {
  const longNode = new StateMachineNode("L");
  longNode.tokenType = KotlinTokenType.LongLiteral;

  const underscoreNode = new StateMachineNode("_");
  underscoreNode.createVisitableState(underscoreNode);

  const digitToNode = Array.from(DIGITS).reduce((acc, digit) => {
    const node = new StateMachineNode(digit);
    acc.set(digit, node);
    node.tokenType = KotlinTokenType.IntegerOrLongLiteral;
    return acc;
  }, new Map<string, StateMachineNode>());

  for (let i = 0; i < DIGITS.length; i++) {
    const digit = DIGITS[i];
    const node = digitToNode.get(digit)!;
    root.createVisitableState(node);
    node.createVisitableState(longNode);
    node.createVisitableState(underscoreNode);
    underscoreNode.createVisitableState(node);

    for (let j = 0; j < DIGITS.length; j++) {
      const childNode = digitToNode.get(DIGITS[j])!;
      node.createVisitableState(childNode);
    }
  }
}

function constructStateMachine(
  root: StateMachineNode = new StateMachineNode(""),
): StateMachineNode {
  constructOperatorsGrammar(root);
  constructIdentifierGrammar(root);
  constructCommentsGrammar(root);
  constructIntegerOrLongGrammar(root);

  return root;
}

export const stateMachine = constructStateMachine();
