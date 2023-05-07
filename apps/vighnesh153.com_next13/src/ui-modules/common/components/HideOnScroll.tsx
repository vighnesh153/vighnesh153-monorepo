'use client';

import { Slide, useScrollTrigger } from '@mui/material';
import { not } from '@vighnesh153/utils';

export function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={not(trigger)}>
      {props.children}
    </Slide>
  );
}
