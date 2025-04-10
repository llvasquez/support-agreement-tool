import React, { ReactNode } from 'react';
import { Box, Container, Paper } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  steps?: { id: number; label: string }[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  steps = [
    { id: 1, label: 'Agreement Type' },
    { id: 2, label: 'Basic Information' },
    { id: 3, label: 'Agreement Details' },
    { id: 4, label: 'Review and Export' },
  ]
}) => {
  return (
    <Container maxWidth={false} sx={{
      height: '100vh',
      p: 2.5,
      bgcolor: 'background.default'
    }}>
      <Paper sx={{
        width: '100%',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          {showSidebar && <Sidebar steps={steps} />}
          <Box component="main" sx={{ flexGrow: 1, p: 0, height: '100%', overflow: 'auto' }}>
            {children}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Layout;