import React from 'react';
import { alpha, Typography } from '@mui/material';

export interface HomePageSectionTitleProps {
  count: string;
  title: string;
}

export function HomePageSectionTitle(props: HomePageSectionTitleProps) {
  return (
    <Typography
      component="h2"
      variant="h4"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        fontWeight: 'bold !important',
        typography: {
          xs: 'h6',
          sm: 'h5',
          md: 'h4',
        },
        '::after': {
          content: '""',
          ml: 3,
          width: '100%',
          maxWidth: 300,
          height: '1px',
          display: 'inline-block',
          backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.3),
        },
      }}
    >
      <Typography
        component="span"
        color="secondary"
        variant="h4"
        sx={{
          fontWeight: 'bold !important',
          typography: {
            xs: 'h6',
            sm: 'h5',
            md: 'h4',
          },
        }}
      >
        {props.count}.
      </Typography>
      &nbsp; {props.title}
    </Typography>
  );
}
