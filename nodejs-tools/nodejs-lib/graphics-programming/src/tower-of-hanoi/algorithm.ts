interface Move {
  from: number;
  to: number;
}

export function towerOfHanoi(discs: number, source: number, intermediate: number, destination: number): Move[] {
  if (discs === 0) {
    return [];
  }
  const firstSet = towerOfHanoi(discs - 1, source, destination, intermediate);
  const secondSet = towerOfHanoi(discs - 1, intermediate, source, destination);

  return [...firstSet, { from: source, to: destination }, ...secondSet];
}
