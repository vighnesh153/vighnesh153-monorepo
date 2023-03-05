import { Box, List } from '@mui/material';
import { DirectoryListItem, MainHeading, RegularFileListItem } from './components';
import { isDirectory, sortedDirectoryInformation } from './utils';
import { PathBreadcrumbs } from './components/PathBreadcrumbs';

export function App() {
  return (
    <Box sx={{ m: 4 }}>
      <MainHeading />
      <Box sx={{ height: 20 }} />
      <PathBreadcrumbs />
      <List sx={{ p: 2, mt: 3, border: '1px solid lightgray' }}>
        {sortedDirectoryInformation.map((file, index) =>
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
