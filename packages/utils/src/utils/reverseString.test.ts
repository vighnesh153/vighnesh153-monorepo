import { reverseString } from './reverseString';

describe('"reverseString" tests', () => {
  it('should reverse empty string', () => {
    expect(reverseString('')).toEqual('');
  });

  it('should reverse single character string', () => {
    expect(reverseString('a')).toEqual('a');
  });

  it('should reverse multi-character string', () => {
    expect(reverseString('Vighnesh')).toEqual('hsenhgiV');
  });
});
