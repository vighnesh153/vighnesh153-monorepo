import { describe, it, expect } from 'vitest';

import { generateGithubGistIdentifier } from '../generateGithubGistIdentifier';

describe('Helpers > "generateGithubGistIdentifier" tests', () => {
  it('should create a slugified github gist identifier', () => {
    const identifier = generateGithubGistIdentifier('Pikachu is the best');

    expect(identifier).toMatchInlineSnapshot(`"__pikachu-is-the-best-db-from-github-gist.txt"`);
  });
});
