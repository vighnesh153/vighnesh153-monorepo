import { ListItem, ListItemProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export type SectionListItemProps = ListItemProps;

export function SectionListItem(props: PropsWithChildren<SectionListItemProps>) {
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

          color: (theme) => theme.palette.secondary.main,
        },
      }}
    >
      {props.children}
    </ListItem>
  );
}
