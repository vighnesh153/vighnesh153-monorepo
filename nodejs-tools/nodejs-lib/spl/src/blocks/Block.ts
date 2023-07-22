import { Scope } from '@/models/Scope';

export abstract class Block {
  abstract scope: Scope;
  abstract execute(): void;
}
