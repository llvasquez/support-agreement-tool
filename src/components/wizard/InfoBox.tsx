import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#e8f4f8', 
        border: 1, 
        borderColor: '#a8d1e5', 
        borderRadius: 1, 
        p: 2, 
        mt: 2, 
        mb: 2 
      }}
    >
      <Typography variant="h2" color="text.primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {children}
      </Typography>
    </Box>
  );
};

export default InfoBox;