import { describe, expect, it } from "vitest";
import { randomEmail, randomUuid } from "@vighnesh153/tools";
import { removeFileContentFromGistMetadata } from "../removeFileContentFromGistMetadata.ts";
import { IGithubGistMetadata } from "../../types/index.ts";

describe('Helpers > "removeFileContentFromGistMetadata" tests', () => {
  it("should remove the file content", () => {
    const gistMetadata: IGithubGistMetadata = {
      id: randomUuid(),
      owner: {
        login: randomEmail(),
      },
      files: {
        "README.md": {
          filename: "README.md",
          content: "# Hello",
        },
        "main.js": {
          filename: "main.js",
          content: 'console.log("hi there");',
        },
      },
    };
    const trimmedMetadata = removeFileContentFromGistMetadata(gistMetadata);
    expect(trimmedMetadata).toMatchObject({
      ...gistMetadata,
      files: {
        "README.md": {
          filename: "README.md",
          content: "",
        },
        "main.js": {
          filename: "main.js",
          content: "",
        },
      },
    });
  });
});
