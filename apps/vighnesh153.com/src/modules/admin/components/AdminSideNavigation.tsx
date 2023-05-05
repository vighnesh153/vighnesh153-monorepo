import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Dashboard as DashboardIcon, Gavel as GavelIcon } from '@mui/icons-material';
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
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
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
