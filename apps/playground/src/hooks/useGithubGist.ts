import { GithubGist } from '@vighnesh153/github-gist';
import { useEffectOnce } from './useEffectOnce';

const personalAccessToken = '111';
const gistId = '111g';

export function useGithubGist() {
  useEffectOnce(() => {
    (async () => {
      const gist = await GithubGist.initializeUsingGistId({ personalAccessToken, gistId });

      const fileJson = gist.createNewFile('vighnesh153.json');
      fileJson.content = JSON.stringify({ message: 'Vighnesh is the best' }, null, 2);

      const filePython = gist.createNewFile('vighnesh153.py');
      filePython.content = `print("Vighnesh is the best")`;

      const fileJs = gist.createNewFile('vighnesh153.js');
      fileJs.content = `console.log("Vighnesh is the best")`;

      await gist.save();

      const fileMd = gist.createNewFile('vighnesh153.md');
      fileMd.content = '# Vighnesh is the best';

      fileJs.content = [fileJs.content, 'console.log("Vighnesh is the best and I know it")'].join('\n');

      await gist.save();
    })();
  });
}
