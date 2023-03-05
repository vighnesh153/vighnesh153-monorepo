import { useMemo } from 'react';
import { Box, List } from '@mui/material';
import { not } from '@vighnesh153/utils';
import { DirectoryListItem, MainHeading, RegularFileListItem } from './components';
import { isDirectory } from './utils';
import { PathBreadcrumbs } from './components/PathBreadcrumbs';

const { directoryInformation } = window;

export function App() {
  const sortedFiles = useMemo(
    () =>
      directoryInformation.sort((file1, file2) => {
        const isFile1Dir = isDirectory(file1.type);
        const isFile2Dir = isDirectory(file2.type);

        if (isFile1Dir && not(isFile2Dir)) return -1;
        if (not(isFile1Dir) && isFile2Dir) return 1;
        return file1.name.localeCompare(file2.name);
      }),
    []
  );

  return (
    <Box sx={{ m: 4 }}>
      <MainHeading />
      <Box sx={{ height: 20 }} />
      <PathBreadcrumbs />
      <List sx={{ p: 2, mt: 3, border: '1px solid lightgray' }}>
        {sortedFiles.map((file, index) =>
          isDirectory(file.type) ? (
            <DirectoryListItem key={index} file={file} />
          ) : (
            <RegularFileListItem key={index} file={file} />
          )
        )}
      </List>
    </Box>
  );
}
