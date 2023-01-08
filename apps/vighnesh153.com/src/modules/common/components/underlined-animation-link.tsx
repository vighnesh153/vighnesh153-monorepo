import { FocusDashedOutline } from './focus-dashed-outline';
import { MuiNextLink, MuiNextLinkProps } from './next-link';

export type UnderlinedAnimationLinkProps = MuiNextLinkProps;

export function UnderlinedAnimationLink(props: UnderlinedAnimationLinkProps) {
  return (
    <FocusDashedOutline sx={{ display: 'inline-block' }}>
      <MuiNextLink
        {...props}
        color="secondary"
        sx={{
          ...props.sx,
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

            transition: (theme) =>
              `right ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },

          ':is(:hover, :focus)': {
            '@media (prefers-reduced-motion: reduce)': {
              textDecoration: 'underline',
            },

            '::after': {
              '@media (prefers-reduced-motion: no-preference)': {
                right: 0,
              },
            },
          },
        }}
      />
    </FocusDashedOutline>
  );
}
