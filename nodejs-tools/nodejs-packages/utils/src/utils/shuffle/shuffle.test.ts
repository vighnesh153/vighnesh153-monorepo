import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('Random > shuffle tests', () => {
  it('should shuffle a number array', () => {
    const initialArray = [1, 2, 3, 4, 5];
    const shuffled = shuffle(initialArray);

    expect(shuffled.length).toBe(initialArray.length);
    initialArray.forEach((item) => {
      expect(shuffled).toContain(item);
    });
  });

  it('should shuffle a string', () => {
    const s = 'Dehlia';
    const shuffled = shuffle(s);

    expect(s.length).toBe(shuffled.length);
    Array.from(s).forEach((ch) => {
      expect(shuffled).toContain(ch);
    });
  });
});
