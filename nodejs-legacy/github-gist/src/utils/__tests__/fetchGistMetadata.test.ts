import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { randomEmail, randomUuid } from "@vighnesh153/tools";
import { fetchGistMetadata } from "../fetchGistMetadata.ts";
import { IGithubGistMetadata } from "../../types/index.ts";

vi.mock("axios");

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchGistMetadata" tests', () => {
  const getConfig = () => ({
    gistId: randomUuid(),
    corsConfig: { type: "default" },
    personalAccessToken: randomUuid(),
  } as const);

  it("should throw 404 if gist is not found", () => {
    const error = new Error("Resource not found");
    mockAxiosImplementation(() => Promise.reject(error));

    expect(() => fetchGistMetadata(getConfig())).rejects.toThrowError(error);
  });

  it("should return the gist metadata based on the identifier provided", async () => {
    const gistMetadata: IGithubGistMetadata = {
      id: randomUuid(),
      owner: {
        login: randomEmail(),
      },
      files: {},
    };

    mockAxiosImplementation(() => Promise.resolve({ data: gistMetadata }));

    const fetchedGistMetadata = await fetchGistMetadata({
      ...getConfig(),
      gistId: gistMetadata.id,
    });
    expect(fetchedGistMetadata).toMatchObject(gistMetadata);
  });
});
