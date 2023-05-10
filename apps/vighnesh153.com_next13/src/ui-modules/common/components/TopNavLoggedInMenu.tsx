'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { IconButton, Avatar, Box, useTheme, Menu, MenuItem } from '@mui/material';

export interface ProfileBoxProps {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function TopNavLoggedInMenu({ user }: ProfileBoxProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    void signOut();
  };

  return (
    <Box>
      <IconButton
        id="profile-button"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: theme.palette.secondary.main }}
      >
        <Avatar
          alt={user?.name ?? undefined}
          src={user?.image ?? undefined}
          imgProps={{
            referrerPolicy: 'no-referrer',
          }}
          sx={{ width: 30, height: 30, border: `2px solid ${theme.palette.secondary.main}` }}
        />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiPopover-paper': {
            background: theme.palette.grey['900'],
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'profile-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
