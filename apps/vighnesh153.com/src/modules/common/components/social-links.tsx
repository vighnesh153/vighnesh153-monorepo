import React from 'react';
import { Box, Tooltip, TooltipProps } from '@mui/material';
import { commonConstants } from '../constants';
import { MuiNextLink } from './next-link';

export interface SocialLinksProps {
  placement?: TooltipProps['placement'];
}

export function SocialLinks({ placement }: SocialLinksProps) {
  return (
    <>
      {commonConstants.profiles.map((profile) => (
        <Box component="li" key={profile.identifier}>
          <Tooltip title={profile.title} placement={placement}>
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
          </Tooltip>
        </Box>
      ))}
    </>
  );
}
