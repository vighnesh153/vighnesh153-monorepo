import { Position } from './Position';
import { euclidianDistance } from './euclidian-distance';

export type Strength = 'NIL' | 'XS' | 'S' | 'M' | 'L' | 'XL';

export function calculateStrength(pos1: Position, pos2: Position): Strength {
  const dist = euclidianDistance([pos1.x, pos1.y], [pos2.x, pos2.y]);
  if (dist < 10) return 'XL';
  if (dist < 35) return 'L';
  if (dist < 75) return 'M';
  if (dist < 125) return 'S';
  if (dist < 200) return 'XS';
  return 'NIL';
}
