export type StageType = 'dev' | 'prod';

export const stage: StageType = (import.meta.env.PUBLIC_VIGHNESH153_STAGE as StageType) ?? 'dev';
