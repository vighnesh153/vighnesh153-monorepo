import { stage } from '@/constants';

export function isProd(): boolean {
  console.log(`Current stage: ${stage}`);
  return stage === 'prod';
}
