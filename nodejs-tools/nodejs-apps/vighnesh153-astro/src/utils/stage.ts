import { type StageType } from "@vighnesh153/tools/vighnesh153";

export const stage: StageType =
  (import.meta.env.PUBLIC_VIGHNESH153_STAGE as StageType) ?? "dev";
