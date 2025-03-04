// src/components/layout/AgreementFooter.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { ClassificationLevel, getClassificationLabel } from '../../types/types';

interface AgreementFooterProps {
    overallClassification: ClassificationLevel;
}

const AgreementFooter: React.FC<AgreementFooterProps> = ({ overallClassification }) => {
  const classificationLabel = getClassificationLabel(overallClassification);
  const currentDate = new Date().toLocaleDateString();

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            borderTop: '1px solid #000', // Add a border at the top of the footer
        }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {classificationLabel}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {currentDate}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {classificationLabel}
            </Typography>
        </Box>
    );
};

export default AgreementFooter;
