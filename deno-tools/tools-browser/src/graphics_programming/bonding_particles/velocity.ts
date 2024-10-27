export interface Velocity {
  dx: number;
  dy: number;
}

function createRandomSign(): 1 | -1 {
  return Math.random() < 0.5 ? 1 : -1;
}

function createRandomSpeed(limit: number): number {
  return Math.random() * limit;
}

export function createVelocity(limit = 1): Velocity {
  return {
    dx: createRandomSpeed(limit) * createRandomSign(),
    dy: createRandomSpeed(limit) * createRandomSign(),
  };
}
