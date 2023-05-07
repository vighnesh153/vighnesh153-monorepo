'use client';

import { Box, List, ListItem, SwipeableDrawer, Typography, useTheme } from '@mui/material';
import { useIsIOS } from '@vighnesh153/react-hooks';
import { not } from '@vighnesh153/utils';

import { NavItemType } from '@/ui-modules/common/types';

import { FocusDashedOutline } from '../FocusDashedOutline';
import { MuiNextLink } from '../MuiNextLink';
import { sideNavigationDrawerWidth } from './navigationConstants';
import { navItems } from './navItems';

export interface SideNavigationDrawerProps {
  isOpen: boolean;
  updateIsOpen: (newIsOpen: boolean) => void;
  navItemTypes: Array<NavItemType>;
}

export function SideNavigationDrawer({ isOpen, updateIsOpen, navItemTypes }: SideNavigationDrawerProps) {
  const theme = useTheme();
  const isIOS = useIsIOS();

  const container = (() => {
    try {
      // this will throw when rendering on server because window is not defined 😅
      return window.document.body;
    } catch (e) {
      return undefined;
    }
  })();

  const toggleDrawer = (newIsOpen = !isOpen) => updateIsOpen(newIsOpen);

  const drawer = (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
      }}
    >
      <List
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '4rem',
        }}
      >
        {navItems
          .filter((item) => navItemTypes.includes(item.id))
          .map((item) => (
            <ListItem key={item.id} disablePadding sx={{ justifyContent: 'center' }}>
              <FocusDashedOutline>
                {item.type === 'link' ? (
                  <MuiNextLink
                    onClick={() => toggleDrawer()}
                    href={item.href}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:is(:hover,:focus)': {
                        color: theme.palette.secondary.main,
                      },
                    }}
                  >
                    <Typography variant="h6" component="span">
                      {item.label}
                    </Typography>
                  </MuiNextLink>
                ) : (
                  item.element
                )}
              </FocusDashedOutline>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      container={container}
      variant="temporary"
      open={isOpen}
      onOpen={() => toggleDrawer(true)}
      onClose={() => toggleDrawer()}
      anchor="right"
      disableBackdropTransition={not(isIOS)}
      disableDiscovery={not(isIOS)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: sideNavigationDrawerWidth,
          background: theme.palette.primary.light,
        },
      }}
    >
      {drawer}
    </SwipeableDrawer>
  );
}
