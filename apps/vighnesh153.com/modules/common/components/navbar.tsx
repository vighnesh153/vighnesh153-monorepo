import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Icons,
  Link,
  List,
  ListItem,
  Toolbar,
  Typography,
  useTheme,
} from '@vighnesh153/ui';
import { useState } from 'react';
import { FocusDashedOutline } from '@modules/common/components/focus-dashed-outline';
import { MuiNextLink } from './next-link';

const drawerWidth = 240;
const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Resume', href: 'https://bit.ly/vighnesh153-resume' },
];

export function Navbar() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100%',
        background: theme.palette.primary.light,
        textAlign: 'center',
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
                href={item.href}
                sx={{
                  color: theme.palette.text.primary,
                  '&:is(:hover,:focus)': {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                <Typography variant="body1" component="span">
                  {item.label}
                </Typography>
              </MuiNextLink>
            </FocusDashedOutline>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = (() => {
    try {
      return window.document.body;
    } catch (e) {
      return undefined;
    }
  })();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icons.Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link component={MuiNextLink} key={item.label} sx={{ color: '#fff' }} href={item.href}>
                {item.label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
