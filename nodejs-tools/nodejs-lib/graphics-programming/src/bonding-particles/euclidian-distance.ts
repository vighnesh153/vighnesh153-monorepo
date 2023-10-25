import { range } from '@vighnesh153/utils';

export function euclidianDistance(point1: number[], point2: number[]): number {
  if (point1.length !== point2.length) {
    throw new Error(`Point dimensions are not the same. Dimension1=${point1.length}, Dimension2=${point2.length}`);
  }
  const squared = Array.from(range(0, point1.length - 1))
    .map((index) => {
      const diff = Math.abs(point1[index] - point2[index]);
      return diff * diff;
    })
    .reduce((prev, curr) => prev + curr, 0);
  return Math.sqrt(squared);
}
