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
import { useIsIOS, useWindowScrollAmount } from '@vighnesh153/react-hooks';
import { not } from '@vighnesh153/utils';
import { commonConstants } from '../constants';
import { FocusDashedOutline } from './focus-dashed-outline';
import { MuiNextLink } from './next-link';

interface NavItem {
  label: string;
  href: string;
}

const drawerWidth = 320;
const navItems: NavItem[] = [
  { label: 'About', href: commonConstants.pageLinks.homePage.aboutSection },
  {
    label: 'Experience',
    href: commonConstants.pageLinks.homePage.experienceSection,
  },
  {
    label: 'Projects',
    href: commonConstants.pageLinks.homePage.projectsSection,
  },
  {
    label: 'Contact',
    href: commonConstants.pageLinks.homePage.contactMeSection,
  },
  { label: 'Resume', href: commonConstants.resumeLink },
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
            color="primary"
            sx={{
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
        <NavDrawer isOpen={mobileDrawerOpen} updateIsOpen={(newIsOpen) => setMobileDrawerOpen(newIsOpen)} />
      </Box>
    </Box>
  );
}
