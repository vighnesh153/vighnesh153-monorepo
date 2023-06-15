import { alpha } from '@mui/material';
import { MuiNextLink, MuiNextLinkProps } from './next-link';

export type BorderCornerAnimationLinkProps = MuiNextLinkProps;

export function BorderCornerAnimationLink(props: BorderCornerAnimationLinkProps) {
  const linkLength = '15px';
  const linkWidth = '2px';
  const linkBorder = 'linear-gradient(currentColor 0%, currentColor 0%)';

  return (
    <MuiNextLink
      {...props}
      color="secondary"
      sx={{
        ...props.sx,

        py: '1rem',
        px: '1.5rem',

        backgroundImage: [linkBorder, linkBorder, linkBorder, linkBorder].join(', '),
        backgroundSize: [
          `${linkLength} ${linkWidth}`,
          `${linkWidth} ${linkLength}`,
          `${linkWidth} ${linkLength}`,
          `${linkLength} ${linkWidth}`,
        ].join(', '),
        backgroundPosition: ['100% 0', '100% 0', '0 100%', '0 100%'].join(', '),
        backgroundRepeat: 'no-repeat',

        textDecoration: 'none',

        '@media (prefers-reduced-motion: no-preference)': {
          transition: (theme) =>
            `background-position ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        },

        ':hover': {
          backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.05),
          backgroundPosition: ['0 0', '100% 100%', '0 0', '100% 100%'].join(', '),
        },
      }}
    />
  );
}
