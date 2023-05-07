'use client';

import { Box, Tooltip, TooltipProps } from '@mui/material';
import { commonModuleConstants } from '../constants';
import { MuiNextLink } from './MuiNextLink';

export interface SocialLinksProps {
  placement?: TooltipProps['placement'];
}

export function SocialLinks({ placement }: SocialLinksProps) {
  return (
    <>
      {commonModuleConstants.profiles.map((profile) => (
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
