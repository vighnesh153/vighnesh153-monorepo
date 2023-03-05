import { ReactElement, useMemo } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { DownloadItem } from './DownloadItem';

export function PathBreadcrumbs(): ReactElement {
  const segments = useMemo(() => window.location.pathname.split('/'), []);

  const isLastSegment = (index: number) => index === segments.length - 1;
  const buildHref = (index: number) => `${segments.slice(0, index + 1).join('/')}` || '/';
  const renderSegment = (index: number, segment: string) => (
    <Typography component="span">{index === 0 ? '~' : segment}</Typography>
  );

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Breadcrumbs>
        {segments.map((segment, index) =>
          isLastSegment(index) ? (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {renderSegment(index, segment)}
              <DownloadItem type="by-href" href={buildHref(index)} />
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
