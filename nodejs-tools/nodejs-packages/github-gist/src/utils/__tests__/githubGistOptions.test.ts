import { describe, expect, it } from 'vitest';
import { randomUuid } from '@vighnesh153/tools';
import { getCorsConfig, getEnableRequestCaching, isGistPublic } from '../githubGistOptionsUtils.ts';

const getBaseConfig = () =>
  ({
    gistId: randomUuid(),
    corsConfig: { type: 'default' },
    personalAccessToken: randomUuid(),
  } as const);

describe('Helpers > "isGistPublic" tests', () => {
  it('should return the default value if options.isPublic is undefined', () => {
    expect(isGistPublic({ ...getBaseConfig() })).toBe(false);
  });

  it('should return the provided value in options', () => {
    const isPublic = Math.random() < 0.5;
    expect(isGistPublic({ ...getBaseConfig(), isPublic })).toBe(isPublic);
  });
});

describe('Helpers > "getEnableRequestCaching" tests', () => {
  it('should return the default value if options.getEnableRequestCaching is undefined', () => {
    expect(getEnableRequestCaching({ ...getBaseConfig() })).toBe(true);
  });

  it('should return the provided value in options', () => {
    const enableRequestCaching = Math.random() < 0.5;
    expect(getEnableRequestCaching({ ...getBaseConfig(), enableRequestCaching })).toBe(enableRequestCaching);
  });
});

describe('Helpers > "getCorsConfig" tests', () => {
  it('should return the default value if options.getCorsConfig is undefined', () => {
    expect(getCorsConfig({ ...getBaseConfig() })).toMatchObject({ type: 'default' });
  });

  it('should return the provided value in options', () => {
    const configs = [{ type: 'none' } as const, { type: 'default' } as const];
    const randomConfigIndex = Math.floor(Math.random() * 2);
    const randomCorsConfig = configs[randomConfigIndex];
    expect(getCorsConfig({ ...getBaseConfig(), corsConfig: randomCorsConfig })).toMatchObject(randomCorsConfig);
  });
});
