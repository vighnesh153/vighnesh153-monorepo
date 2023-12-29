import { type CanvasProject } from '@vighnesh153/graphics-programming';

export function verifyCanvasProjectPath(
  project: CanvasProject,
  url: string,
  linkBuilder: (projectId: string) => string
): void {
  // remove trailing ".html"
  const actualPathName = new URL(url).pathname.replace(/\.html$/, '');
  const expectedPathName = linkBuilder(project.id);

  if (actualPathName !== expectedPathName) {
    throw new Error(
      `Path doesn't match for graphics project with title: ${project.title}. ` +
        `Expected "${expectedPathName}", found "${actualPathName}"`
    );
  }
}
