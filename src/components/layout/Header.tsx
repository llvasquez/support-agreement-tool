import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ borderRadius: '5px 5px 0 0' }}>
      <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          Support Agreement Development Tool
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;