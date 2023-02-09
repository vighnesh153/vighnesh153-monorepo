import { slugify } from '@vighnesh153/utils';
import { constants } from '../constants';

export function generateGithubGistIdentifier(userProvidedIdentifier: string): string {
  const { prefix, suffix } = constants.identifier;
  return prefix + slugify(userProvidedIdentifier) + suffix;
}
