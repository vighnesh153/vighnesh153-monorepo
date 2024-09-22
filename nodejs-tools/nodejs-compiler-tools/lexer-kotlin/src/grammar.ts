import { ALPHABET, DIGITS, not } from '@vighnesh153/tools-platform-independent';
import { KotlinTokenType, operatorTokens } from './tokens';

class StateMachineNode {
  fallbackNode: StateMachineNode | null = null;
  tokenType: KotlinTokenType | null = null;
  private nextStates = new Map<string, StateMachineNode>();

  get isTerminal(): boolean {
    return this.tokenType !== null;
  }

  constructor(readonly currCh: string) {}

  isVisitable(state: string): boolean {
    return this.nextStates.has(state) || this.fallbackNode !== null;
  }

  getVisitableState(state: string): StateMachineNode {
    if (not(this.isVisitable(state))) {
      throw new Error(`getVisitableState called with '${state}' that is not possible to visit`);
    }
    return this.nextStates.get(state)! || this.fallbackNode!;
  }

  createVisitableState(state: string, node: StateMachineNode): void {
    this.nextStates.set(state, node);
  }
}

function constructOperatorsGrammar(root: StateMachineNode) {
  for (const operatorToken of operatorTokens) {
    const literal = operatorToken.value;
    let intermediateNode = root;
    for (let i = 0; i < literal.length; i++) {
      const state = literal[i];
      if (not(intermediateNode.isVisitable(state))) {
        intermediateNode.createVisitableState(state, new StateMachineNode(state));
      }
      intermediateNode = intermediateNode.getVisitableState(state);
    }
    intermediateNode.tokenType = operatorToken;
  }
}

function constructIdentifierGrammar(root: StateMachineNode) {
  const startCharacters = ALPHABET + '_';
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
      currState.createVisitableState(state, nextState);
    }
  }

  // link all start characters to root
  for (let i = 0; i < startCharacters.length; i++) {
    const state = startCharacters[i];
    const node = charToNode.get(state)!;
    root.createVisitableState(state, node);
  }
}

function constructCommentsGrammar(root: StateMachineNode) {
  let node = root;
  if (not(root.isVisitable('/'))) {
    node.createVisitableState('/', new StateMachineNode('/'));
  }
  node = node.getVisitableState('/');

  // single line
  if (not(root.isVisitable('/'))) {
    node.createVisitableState('/', new StateMachineNode('/'));
  }
  node = node.getVisitableState('/');
  node.tokenType = KotlinTokenType.SingleLineComment;
  node.fallbackNode = node;
  const newLineNode = new StateMachineNode('\n');
  newLineNode.tokenType = KotlinTokenType.SingleLineComment;
  node.createVisitableState('\n', newLineNode);

  // multi line
  node = root.getVisitableState('/');
  if (not(root.isVisitable('*'))) {
    node.createVisitableState('*', new StateMachineNode('*'));
  }
  const startStarNode = node.getVisitableState('*');
  const endStarNode = new StateMachineNode('*');
  endStarNode.fallbackNode = startStarNode;
  startStarNode.createVisitableState('*', endStarNode);
  const endForwardSlashNode = new StateMachineNode('/');
  endForwardSlashNode.tokenType = KotlinTokenType.MultiLineComment;
  endStarNode.createVisitableState('/', endForwardSlashNode);
}

function constructStateMachine(root: StateMachineNode = new StateMachineNode('')): StateMachineNode {
  constructOperatorsGrammar(root);
  constructIdentifierGrammar(root);
  constructCommentsGrammar(root);

  return root;
}

export const stateMachine = constructStateMachine();
