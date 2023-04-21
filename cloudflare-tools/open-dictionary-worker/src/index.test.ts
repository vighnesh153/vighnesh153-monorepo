import { describe, expect, it } from 'vitest';

import worker from '.';

describe('Worker', () => {
  it('should return correct message if word is not provided', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await worker.fetch({ url: `https://open-dictionary.vighnesh153.workers.dev` });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        message: 'Please provide word using the "?word=<YOUR-WORD>" format',
      });
    }
  });

  it('should return correct message if word is invalid english word', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await worker.fetch({ url: `https://open-dictionary.vighnesh153.workers.dev?word=vighnesh` });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        message: `Word "vighnesh" not found.`,
        searchUrl: 'https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/v/i/g/h/n/e/s/h/_.json',
      });
    }
  });

  it('should return correct definition if word is correct english word', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await worker.fetch({ url: `https://open-dictionary.vighnesh153.workers.dev?word=b` });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        word: 'b',
        etymologies: [
          {
            description: [
              'Modification of capital letter B by dropping its upper loop, from the Greek letter Β (B, “Beta”).',
            ],
            adjectives: [],
            adverbs: [],
            nouns: [],
            prepositions: [],
            verbs: [],
          },
        ],
      });
    }
  });
});
