import { ALPHABET, DIGITS, not } from '@vighnesh153/tools-platform-independent';
import { KotlinTokenType, operatorTokens } from './tokens';

class StateMachineNode {
  tokenType: KotlinTokenType | null = null;
  private nextStates = new Map<string, StateMachineNode>();

  get isTerminal(): boolean {
    return this.tokenType !== null;
  }

  constructor(readonly currCh: string) {}

  isVisitable(state: string): boolean {
    return this.nextStates.has(state);
  }

  getVisitableState(state: string): StateMachineNode {
    if (not(this.isVisitable(state))) {
      throw new Error(`getVisitableState called with '${state}' that is not possible to visit`);
    }
    return this.nextStates.get(state)!;
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

function constructStateMachine(root: StateMachineNode = new StateMachineNode('')): StateMachineNode {
  constructOperatorsGrammar(root);
  constructIdentifierGrammar(root);

  return root;
}

export const stateMachine = constructStateMachine();
