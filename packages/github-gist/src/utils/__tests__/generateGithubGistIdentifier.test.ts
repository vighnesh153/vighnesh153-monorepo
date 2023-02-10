import { generateGithubGistIdentifier } from '../generateGithubGistIdentifier';

describe('Helpers > "generateGithubGistIdentifier" tests', () => {
  it('should create a slugified github gist identifier', () => {
    const identifier = generateGithubGistIdentifier('Pikachu is the best');

    expect(identifier).toMatchInlineSnapshot(`"__Pikachu-is-the-best-db-from-github-gist.txt"`);
  });
});
