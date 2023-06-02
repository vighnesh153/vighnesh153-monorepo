import React, { useState } from 'react';
import { alpha, AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { RVLogoIcon } from '@vighnesh153/react-ui';
import { useWindowScrollAmount } from '@vighnesh153/react-hooks';
import { FocusDashedOutline } from '../focus-dashed-outline';
import { MuiNextLink } from '../next-link';
import { HideOnScroll, navItems, NavItemSection } from './common';
import { NavDrawer } from './nav-drawer';

export interface NavbarProps {
  navItemSections: Array<NavItemSection>;
}

export function Navbar({ navItemSections }: NavbarProps) {
  const theme = useTheme();
  const { scrollAmount: windowScrollAmount } = useWindowScrollAmount();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  const getAppBarBoxShadow = () => {
    if (windowScrollAmount.scrollY < 70) {
      return 'none';
    }
    return `0 10px 30px -10px ${alpha(theme.palette.primary.dark, 0.7)}`;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FocusDashedOutline>
        <HideOnScroll>
          <AppBar
            component="nav"
            sx={{
              background: theme.palette.primary.main,
              boxShadow: getAppBarBoxShadow(),
            }}
          >
            <Toolbar sx={{ py: '1.5rem' }}>
              <Box
                sx={{
                  flexGrow: 1,
                  fontSize: 0,
                  svg: {
                    width: '2.5rem',
                    height: '2.5rem',
                  },
                }}
              >
                <MuiNextLink href="/" color={theme.palette.secondary.main}>
                  <RVLogoIcon />
                </MuiNextLink>
              </Box>
              <Box sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex', gap: '2rem' } }}>
                {navItems
                  .filter((item) => navItemSections.includes(item.id))
                  .map((item) =>
                    item.type === 'link' ? (
                      <MuiNextLink
                        key={item.id}
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
                      <Box key={item.id}>{item.element}</Box>
                    )
                  )}
              </Box>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  color: theme.palette.text.primary,
                  '&:is(:hover, :focus)': {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </FocusDashedOutline>
      <Box component="nav">
        <NavDrawer
          isOpen={mobileDrawerOpen}
          updateIsOpen={(newIsOpen) => setMobileDrawerOpen(newIsOpen)}
          navItemSections={navItemSections}
        />
      </Box>
    </Box>
  );
}
