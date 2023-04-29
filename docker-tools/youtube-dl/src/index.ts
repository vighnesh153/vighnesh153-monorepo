import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export function getDirName(): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return path.dirname(fileURLToPath(import.meta.url));
}

const port = process.env.PORT ?? 3001;

const app = express();

app.use(express.static('public'));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(getDirName(), 'main.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port: ${port} ⚡️`);
});
