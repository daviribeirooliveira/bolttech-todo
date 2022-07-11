import { AccountCircle } from '@mui/icons-material';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import * as React from 'react';

const styles = {
  root: {
    paddingBottom: 12,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

export default function AppBar() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const isProfileMenuOpen = Boolean(anchor);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchor(event.currentTarget);

  const handleProfileMenuClose = () => setAnchor(null);

  const menuId = 'profile-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={styles.root}>
      <MuiAppBar>
        <Toolbar sx={styles.toolbar}>
          <Typography variant="h6">bolttech TODO:</Typography>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            size="large"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      {renderMenu}
    </Box>
  );
}
