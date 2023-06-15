import { MuiNextLink, MuiNextLinkProps } from './next-link';

export type UnderlinedAnimationLinkProps = MuiNextLinkProps;

export function UnderlinedAnimationLink(props: UnderlinedAnimationLinkProps) {
  return (
    <MuiNextLink
      {...props}
      color="secondary"
      sx={{
        ...props.sx,
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'nowrap',
        textDecoration: 'none',

        '::after': {
          content: '""',

          height: '1px',
          position: 'absolute',
          left: 0,
          right: '100%',
          bottom: -2,

          backgroundColor: 'currentColor',

          '@media (prefers-reduced-motion: no-preference)': {
            transition: (theme) =>
              `right ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },
        },

        ':hover::after': {
          right: 0,
        },
      }}
    />
  );
}
