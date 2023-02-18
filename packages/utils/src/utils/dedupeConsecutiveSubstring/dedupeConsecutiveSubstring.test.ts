import { dedupeConsecutiveSubstring } from './dedupeConsecutiveSubstring';

describe('"dedupeConsecutiveSubstring" tests', () => {
  it('should not dedupe non-consecutive substring', () => {
    expect(dedupeConsecutiveSubstring('PikaPiPika', 'Pika')).toEqual('PikaPiPika');
  });

  it('should dedupe consecutive substring', () => {
    expect(dedupeConsecutiveSubstring('aaabbabaabaaaba', 'a')).toEqual('abbabababa');
    expect(dedupeConsecutiveSubstring('PiPikaPikaPiPikaPika', 'Pika')).toEqual('PiPikaPiPika');
  });
});
