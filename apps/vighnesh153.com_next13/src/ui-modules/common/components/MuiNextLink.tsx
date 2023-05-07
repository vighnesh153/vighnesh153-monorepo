'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

type CustomNextLinkProps = Omit<NextLinkProps, 'href'> & {
  _href: NextLinkProps['href'];
};

function CustomNextLink({ _href, ...props }: CustomNextLinkProps) {
  return <NextLink href={_href} {...props} />;
}

export type MuiNextLinkProps = Omit<MuiLinkProps<typeof NextLink>, 'href'> & {
  href: NextLinkProps['href'];
};

export function MuiNextLink({ href, ...props }: MuiNextLinkProps) {
  return <MuiLink {...props} component={CustomNextLink} _href={href} />;
}
