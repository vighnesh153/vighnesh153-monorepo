import { RVLogoIcon } from '@vighnesh153/ui';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Slide,
  Typography,
  useTheme,
  useScrollTrigger,
  alpha,
} from '@mui/material';
import React, { useState } from 'react';
import { useIsIOS } from '@vighnesh153/react-hooks';
import { not } from '@vighnesh153/utils';
import { FocusDashedOutline } from './focus-dashed-outline';
import { MuiNextLink } from './next-link';

interface NavItem {
  label: string;
  href: string;
}

const drawerWidth = 320;
const navItems: NavItem[] = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Resume', href: 'https://bit.ly/vighnesh153-resume' },
];

function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={not(trigger)}>
      {props.children}
    </Slide>
  );
}

function NavDrawer({ isOpen, updateIsOpen }: { isOpen: boolean; updateIsOpen: (newIsOpen: boolean) => void }) {
  const theme = useTheme();
  const isIOS = useIsIOS();

  const container = (() => {
    try {
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
        background: theme.palette.primary.light,
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
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ justifyContent: 'center' }}>
            <FocusDashedOutline>
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
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </SwipeableDrawer>
  );
}

export function Navbar() {
  const theme = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FocusDashedOutline>
        <HideOnScroll>
          <AppBar
            component="nav"
            color="primary"
            sx={{
              boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.dark, 0.7)}`,
            }}
          >
            <Toolbar sx={{ py: '2rem', px: '2rem' }}>
              <Box
                sx={{
                  flexGrow: 1,
                  fontSize: 0,
                  svg: {
                    width: 40,
                    height: 40,
                  },
                }}
              >
                <MuiNextLink href="/" color={theme.palette.secondary.main}>
                  <RVLogoIcon />
                </MuiNextLink>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex', gap: '2rem' } }}>
                {navItems.map((item) => (
                  <MuiNextLink
                    key={item.label}
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
                ))}
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { md: 'none' },
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </FocusDashedOutline>
      <Box component="nav">
        <NavDrawer isOpen={mobileDrawerOpen} updateIsOpen={(newIsOpen) => setMobileDrawerOpen(newIsOpen)} />
      </Box>
    </Box>
  );
}
