// src/components/wizard/ReviewExportStep.tsx
import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ClassificationLevel, Section, Agreement } from '../../types/types';
import WizardNavigation from './WizardNavigation';

const ReviewExportStep: React.FC = () => {
  const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);

  // Helper function to determine the overall classification level
  const getOverallClassification = (agreement: Agreement | null): ClassificationLevel => {
    if (!agreement || !agreement.sections) return ClassificationLevel.UNCLASSIFIED;

    const sectionClassificationLevels = agreement.sections.map(section => section.classificationMarking);

    if (sectionClassificationLevels.includes('TS')) return ClassificationLevel.TOP_SECRET;
    if (sectionClassificationLevels.includes('S')) return ClassificationLevel.SECRET;
    if (sectionClassificationLevels.includes('C')) return ClassificationLevel.CONFIDENTIAL;
    return ClassificationLevel.UNCLASSIFIED;
  };

  const getClassificationLabel = (level: ClassificationLevel): string => {
    switch (level) {
      case ClassificationLevel.UNCLASSIFIED:
        return "Unclassified";
      case ClassificationLevel.CONFIDENTIAL:
        return "Confidential";
      case ClassificationLevel.SECRET:
        return "Secret";
      case ClassificationLevel.TOP_SECRET:
        return "Top Secret";
      default:
        return "Unknown";
    }
  };

  // Get the overall classification for this agreement
  const overallClassification = getOverallClassification(currentAgreement);
  const classificationLabel = getClassificationLabel(overallClassification);

  // Render section list
  const renderSection = (section: Section) => (
    <ListItem key={section.id} sx={{ display: 'block' }}>
      <Typography variant="h6" gutterBottom>
        {section.name}
      </Typography>
      <Typography variant="body1" paragraph>
        {section.content}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
            Classification Marking: {section.classificationMarking}
        </Typography>
    </ListItem>
  );

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LinearProgress
            variant="determinate"
            value={80}
            sx={{ mb: 3, height: 10, bgcolor: '#eeeeee' }}
      />
      <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>
        Review & Export
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: '#eeeeee', pb: 1, mb: 3 }} />

      <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
        Review the agreement details and export the document.
      </Typography>

      {/* Agreement Summary */}
      {currentAgreement ? (
        <>
          <Typography variant="h4" gutterBottom>
            {currentAgreement.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Overall Classification: {classificationLabel}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom>
            Sections:
          </Typography>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {currentAgreement.sections.map(renderSection)}
          </List>
        </>
      ) : (
        <Typography>No agreement details found.</Typography>
      )}

      <Box sx={{ flexGrow: 1 }} />
      <WizardNavigation />
    </Box>
  );
};

export default ReviewExportStep;
