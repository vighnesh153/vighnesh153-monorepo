import { type StageType } from '@vighnesh153/tools-platform-independent';

export const stage: StageType = (import.meta.env.PUBLIC_VIGHNESH153_STAGE as StageType) ?? 'dev';
