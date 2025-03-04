// src/components/layout/AgreementHeader.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { ClassificationLevel, getClassificationLabel } from '../../types/types';

interface AgreementHeaderProps {
    overallClassification: ClassificationLevel;
}

const AgreementHeader: React.FC<AgreementHeaderProps> = ({ overallClassification }) => {
    const classificationLabel = getClassificationLabel(overallClassification);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1,
            borderBottom: '1px solid #000', // Add a border at the bottom of the header
        }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {classificationLabel}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                Agreement Header
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {classificationLabel}
            </Typography>
        </Box>
    );
};

export default AgreementHeader;
