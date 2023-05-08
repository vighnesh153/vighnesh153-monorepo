'use client';

import { lazy, Suspense } from 'react';
import { Box, TooltipProps } from '@mui/material';
import { commonModuleConstants } from '../constants';
import { MuiNextLink } from './MuiNextLink';

const Tooltip = lazy(() => import('@mui/material/Tooltip'));

export interface SocialLinksProps {
  placement?: TooltipProps['placement'];
}

export function SocialLinks({ placement }: SocialLinksProps) {
  const link = (profile: (typeof commonModuleConstants.profiles)[number]) => (
    <MuiNextLink
      href={profile.link}
      aria-label={`Link to ${profile.title}`}
      sx={{
        display: 'inline-block',

        fontSize: 0,
        color: (theme) => theme.palette.text.primary,
        '&:is(:hover, :focus)': {
          color: (theme) => theme.palette.secondary.main,
        },
      }}
    >
      <profile.Icon size="1.25rem" />
    </MuiNextLink>
  );

  return (
    <>
      {commonModuleConstants.profiles.map((profile) => (
        <Box component="li" key={profile.identifier}>
          <Suspense fallback={link(profile)}>
            <Tooltip title={profile.title} placement={placement}>
              {link(profile)}
            </Tooltip>
          </Suspense>
        </Box>
      ))}
    </>
  );
}
