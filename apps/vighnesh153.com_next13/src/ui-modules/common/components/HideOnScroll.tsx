'use client';

import { lazy, Suspense } from 'react';
import { useScrollTrigger } from '@mui/material';
import { not } from '@vighnesh153/utils';

const Slide = lazy(() => import('@mui/material/Slide'));

export function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Suspense fallback={props.children}>
      <Slide appear={false} direction="down" in={not(trigger)}>
        {props.children}
      </Slide>
    </Suspense>
  );
}
