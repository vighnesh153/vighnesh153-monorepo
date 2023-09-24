import { type GraphicsProject } from '@vighnesh153/graphics-programming';

import { internalLinks } from '@/constants';

export function verifyGraphicsProjectPath(project: GraphicsProject, url: string): void {
  const actualPathName = new URL(url).pathname;
  const expectedPathName = internalLinks.projects.graphicsProjects.buildProjectLinkFromId(project.id);

  if (actualPathName !== expectedPathName) {
    throw new Error(`Path doesn't match for graphics project with title: ${project.title}`);
  }
}
