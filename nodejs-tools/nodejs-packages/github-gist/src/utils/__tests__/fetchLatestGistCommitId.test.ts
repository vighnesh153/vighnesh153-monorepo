import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { randomUuid } from "@vighnesh153/tools";
import { fetchLatestGistCommitId } from "../fetchLatestGistCommitId.ts";

vi.mock("axios");

function mockAxiosImplementation<T>(impl: () => Promise<T>) {
  // @ts-ignore
  axios.mockImplementation(impl);
}

describe('Helpers > "fetchLatestGistCommitId" tests', () => {
  const getConfig = () => ({
    gistId: randomUuid(),
    corsConfig: { type: "default" },
    personalAccessToken: randomUuid(),
  } as const);

  it("should fetch the latest commit id", async () => {
    const expectedLatestCommitId = randomUuid();

    mockAxiosImplementation(() =>
      Promise.resolve({
        data: [{ version: expectedLatestCommitId }],
      })
    );

    const actualLatestCommitId = await fetchLatestGistCommitId(getConfig());
    expect(actualLatestCommitId).toEqual(expectedLatestCommitId);
  });
});
