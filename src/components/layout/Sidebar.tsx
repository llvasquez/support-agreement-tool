import React from 'react';
import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface SidebarProps {
  steps: { id: number; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ steps }) => {
  const currentStep = useSelector((state: RootState) => state.wizard.currentStep);

  return (
    <Box 
      component={Paper} 
      sx={{ 
        width: '200px', 
        height: '100%', 
        bgcolor: '#f0f0f0', 
        borderRadius: 0
      }}
      elevation={0}
    >
      <List disablePadding>
        {steps.map((step) => (
          <ListItem
            key={step.id}
            sx={{
              bgcolor: currentStep === step.id ? 'primary.light' : 'transparent',
              color: currentStep === step.id ? 'white' : 'text.secondary',
              height: '40px',
              '&:hover': {
                bgcolor: currentStep === step.id ? 'primary.light' : '#e0e0e0',
              },
            }}
          >
            <ListItemText primary={`${step.id}. ${step.label}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;