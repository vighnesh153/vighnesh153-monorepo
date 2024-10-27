import { describe, expect, it } from "vitest";

import worker from "./index.ts";

describe("Worker", () => {
  it("should return correct message if word is not provided", async () => {
    // @ts-ignore: legacy
    const resp = await worker.fetch({
      url: `https://open-dictionary.vighnesh153.workers.dev`,
    });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        message: 'Please provide word using the "?word=<YOUR-WORD>" format',
      });
    }
  });

  it("should return correct message if word is invalid english word", async () => {
    // @ts-ignore: legacy
    const resp = await worker.fetch({
      url: `https://open-dictionary.vighnesh153.workers.dev?word=vighnesh`,
    });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        message: `Word "vighnesh" not found.`,
        searchUrl:
          "https://raw.githubusercontent.com/vighnesh153/open-dictionary/main/data/v/i/g/h/n/e/s/h/_.json",
      });
    }
  });

  it("should return correct definition if word is correct english word", async () => {
    // @ts-ignore: legacy
    const resp = await worker.fetch({
      url: `https://open-dictionary.vighnesh153.workers.dev?word=ok`,
    });
    if (resp) {
      const json = await resp.json();
      expect(json).toMatchObject({
        word: "ok",
        etymologies: [
          {
            description: [],
            adjectives: [
              {
                description: "ok",
                definitionGroups: [
                  {
                    group: null,
                    entries: [{
                      meaning: "(informal) Alternative letter-case form of OK",
                      examples: [],
                    }],
                  },
                ],
              },
            ],
            adverbs: [],
            nouns: [],
            prepositions: [],
            verbs: [],
            letter: [],
            number: [],
          },
        ],
      });
    }
  });
});
