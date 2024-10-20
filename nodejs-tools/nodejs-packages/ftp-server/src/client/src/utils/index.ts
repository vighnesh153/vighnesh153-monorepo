import { not } from '@vighnesh153/tools';
import { Vighnesh153File } from '../../../types';

export const isDirectory = (fileType: Vighnesh153File['type']) => fileType === 'directory';

// Mock information for development
// const directoryInformation: Vighnesh153File[] = [
//   { name: 'usr', type: 'directory' },
//   { name: 'bin', type: 'directory' },
//   { name: 'etc', type: 'directory' },
//   { name: 'opt', type: 'directory' },
//   { name: 'var', type: 'directory' },
//   { name: '.zshrc', type: 'file' },
//   { name: '.bashrc', type: 'file' },
//   { name: '.gitignore', type: 'file' },
// ]

const { directoryInformation } = window;

export const sortedDirectoryInformation = directoryInformation.sort((file1, file2) => {
  const isFile1Dir = isDirectory(file1.type);
  const isFile2Dir = isDirectory(file2.type);

  if (isFile1Dir && not(isFile2Dir)) return -1;
  if (not(isFile1Dir) && isFile2Dir) return 1;
  return file1.name.localeCompare(file2.name);
});

export function directoryZipAndDownloadPath(directoryPath: string): string {
  return `/zip?path=${directoryPath}`;
}

export const windowPathname = (() => {
  let p = window.location.pathname
  while (p.at(-1) === "/") {
    p = p.slice(0, p.length - 1)
  }
  return p
})();
