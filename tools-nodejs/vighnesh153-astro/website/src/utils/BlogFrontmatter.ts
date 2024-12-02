export interface BlogFrontmatter {
  title: string | undefined;
  description: string | undefined;
  creationDate: string | undefined;
  tags: string[] | undefined;
  live: boolean | undefined;
}
