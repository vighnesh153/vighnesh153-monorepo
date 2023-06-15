import { ReactElement } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { DownloadItem } from './DownloadItem';
import { directoryZipAndDownloadPath } from '../utils';

const segments = window.location.pathname.split('/');
const isLastSegment = (index: number) => index === segments.length - 1;

const buildHref = (index: number) => `${segments.slice(0, index + 1).join('/')}` || '/';

const renderSegment = (index: number, segment: string) => (
  <Typography component="span">{index === 0 ? '~' : segment}</Typography>
);

export function PathBreadcrumbs(): ReactElement {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Breadcrumbs>
        {segments.map((segment, index) =>
          isLastSegment(index) ? (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {renderSegment(index, segment)}
              <DownloadItem type="by-href" href={directoryZipAndDownloadPath(buildHref(index))} />
            </Box>
          ) : (
            <Link key={index} href={buildHref(index)}>
              {renderSegment(index, segment)}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}
