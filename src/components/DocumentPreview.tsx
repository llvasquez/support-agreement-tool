// src/components/DocumentPreview.tsx
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  Container,
  Button,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '../store/store';
import { ClassificationLevel } from '../types/types';

const DocumentPreview: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // This line is causing the TypeScript error - fixing the state access
  // Assuming your Redux store has an agreementState instead of a wizard state
  const { currentAgreement } = useSelector((state: RootState) => state.agreement);
  const documentRef = useRef<HTMLDivElement>(null);
  
  if (!currentAgreement) {
    return (
      <Container>
        <Typography variant="h5" sx={{ my: 4 }}>
          No agreement selected. Please create or load an agreement.
        </Typography>
      </Container>
    );
  }

  const getClassificationColor = (classification: ClassificationLevel) => {
    switch (classification) {
      case ClassificationLevel.UNCLASSIFIED: 
        return 'success.main';
      default:
        return 'primary.main';
    }
  };
  
  return (
    <Box>
      {/* Component content would go here */}
    </Box>
  );
};

export default DocumentPreview;