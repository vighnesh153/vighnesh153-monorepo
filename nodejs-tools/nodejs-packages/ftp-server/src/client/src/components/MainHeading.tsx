import { ReactElement } from 'react';
import { Typography } from '@mui/material';

export function MainHeading(): ReactElement {
  return (
    <Typography
      component="h1"
      variant="h3"
      sx={{
        typography: {
          xs: 'h4',
          md: 'h3',
        },
      }}
    >
      File transfer protocol server
    </Typography>
  );
}
