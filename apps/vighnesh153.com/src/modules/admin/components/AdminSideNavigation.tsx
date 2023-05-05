import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Gavel as GavelIcon } from '@mui/icons-material';

import { MuiNextLink } from '@/modules/common';

import { adminModuleConstants } from '../constants';
import { useAdminSideNavigation } from '../hooks';

export function AdminSideNavigation() {
  // eslint-disable-next-line no-empty-pattern
  const {} = useAdminSideNavigation();
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <List>
        <ListItem>
          <ListItemButton component={MuiNextLink} href={adminModuleConstants.routes.dashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={MuiNextLink} href={adminModuleConstants.routes.permissions}>
            <ListItemIcon>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Permissions" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
