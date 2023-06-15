'use client';

import { useMemo } from 'react';
import { ListItem, ListItemProps, useTheme } from '@mui/material';

export type SectionListItemProps = ListItemProps & {
  children: React.ReactNode;
};

export function HomePageSectionListItem(props: SectionListItemProps) {
  const theme = useTheme();

  const beforeElColor = useMemo(() => theme.palette.secondary.main, [theme]);

  return (
    <ListItem
      {...props}
      sx={{
        ...props.sx,
        py: 0,
        pl: 3,
        position: 'relative',

        '::before': {
          content: '"▹"',
          position: 'absolute',
          left: 0,

          color: beforeElColor,
        },
      }}
    >
      {props.children}
    </ListItem>
  );
}
