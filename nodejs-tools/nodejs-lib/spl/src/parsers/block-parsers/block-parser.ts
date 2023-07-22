import { Block } from '@/blocks/Block';
import { Scope } from '@/models/Scope';
import { LineOfCode } from '@/models/LineOfCode';

export abstract class BlockParser {
  abstract scope: Scope;
  abstract lineOfCodes: LineOfCode[];

  abstract tryParse(): boolean;
  abstract parse(): Block;
}
