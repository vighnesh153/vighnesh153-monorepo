import { describe, expect, it } from 'vitest';
import { trim, trimEnd, trimStart } from './trimUtils';

describe('"trimStart" tests', () => {
  it('should do nothing if there is no whitespace', () => {
    expect(trimStart('123')).toEqual('123');
  });

  it('should trim the whitespace', () => {
    expect(trimStart('  123')).toEqual('123');
  });

  it('should not trim if custom character is empty', () => {
    expect(trimStart('   Pikachu', '')).toEqual('   Pikachu');
  });

  it('should trim single character custom character', () => {
    expect(trimStart(';;;Pikachu', ';')).toEqual('Pikachu');
  });

  it('should trim multi-character custom character', () => {
    expect(trimStart('PikaPikaPikachu', 'Pika')).toEqual('chu');
    expect(trimStart('PiPiPi', 'Pi')).toEqual('');
    expect(trimStart('PiPiP...', 'Pi')).toEqual('P...');
  });
});

describe('"trimEnd" tests', () => {
  it('should do nothing if there is no whitespace', () => {
    expect(trimEnd('123')).toEqual('123');
  });

  it('should trim the whitespace', () => {
    expect(trimEnd('123   ')).toEqual('123');
  });

  it('should not trim if custom character is empty', () => {
    expect(trimEnd('Pikachu   ', '')).toEqual('Pikachu   ');
  });

  it('should trim single character custom character', () => {
    expect(trimEnd('Pikachu;;;', ';')).toEqual('Pikachu');
  });

  it('should trim multi-character custom character', () => {
    expect(trimEnd('PikachuuuPikaPikaPika', 'Pika')).toEqual('Pikachuuu');
    expect(trimEnd('PiPiPi', 'Pi')).toEqual('');
    expect(trimEnd('...iPiPiPi', 'Pi')).toEqual('...i');
  });
});

describe('"trim" tests', () => {
  it('should do nothing if there is no whitespace', () => {
    expect(trim('123')).toEqual('123');
  });

  it('should trim the whitespace', () => {
    expect(trim('     123   ')).toEqual('123');
  });

  it('should not trim if custom character is empty', () => {
    expect(trim('   Pikachu   ', '')).toEqual('   Pikachu   ');
  });

  it('should trim single character custom character', () => {
    expect(trim(';;;;;;;;Pikachu;;;', ';')).toEqual('Pikachu');
  });

  it('should trim multi-character custom character', () => {
    expect(trim('PikachuuuPikaPikaPika', 'Pika')).toEqual('chuuu');
    expect(trim('PiPiPi', 'Pi')).toEqual('');
    expect(trim('PiPiP...PPiPiPi', 'Pi')).toEqual('P...P');
  });
});
