// src/components/wizard/ReviewExportStep.tsx
import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, LinearProgress, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ClassificationLevel, Section, Agreement, getClassificationLabel } from '../../types/types';
import WizardNavigation from './WizardNavigation';
import { jsPDF } from 'jspdf';
import * as docx from 'docx';
import AgreementHeader from '../layout/AgreementHeader';
import AgreementFooter from '../layout/AgreementFooter';

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

    // Function to handle PDF export
    const handleExportPDF = () => {
      if (!currentAgreement) return;
      const doc = new jsPDF();

      // Add Header
      doc.setFontSize(10);
      doc.text(`${classificationLabel}`, 10, 10);
      doc.text(`Agreement Header`, 90, 10);
      doc.text(`${classificationLabel}`, 190, 10);

      // Add Footer
      const pageHeight = doc.internal.pageSize.getHeight();
      const currentDate = new Date().toLocaleDateString();
      doc.text(`${classificationLabel}`, 10, pageHeight - 10);
      doc.text(`${currentDate}`, 90, pageHeight - 10);
      doc.text(`${classificationLabel}`, 190, pageHeight - 10);

      // Add Content
      doc.setFontSize(24);
      doc.text(`${currentAgreement.title}`, 10, 30);
      doc.setFontSize(14);
      currentAgreement.sections.forEach((section, index) => {
          doc.text(`${section.name}`, 10, 50 + (index * 40));
          doc.setFontSize(12);
          doc.text(`${section.content}`, 10, 60 + (index * 40));
          doc.setFontSize(10);
          doc.text(`Classification Marking: ${section.classificationMarking}`, 10, 70 + (index * 40));
      });

      doc.save(`${currentAgreement.title}.pdf`);
    };

    // Function to handle DOCX export
    const handleExportDOCX = async () => {
      if (!currentAgreement) return;
      const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType } = docx;
      const { sections } = currentAgreement;

      const doc = new Document({
        sections: [
          {
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${classificationLabel}`,
                        bold: true,
                      }),
                      new TextRun({
                        text: "Agreement Header",
                        bold: true,
                      }),
                       new TextRun({
                        text: `${classificationLabel}`,
                        bold: true,
                      })
                    ],
                    alignment: AlignmentType.CENTER
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${classificationLabel}`,
                        bold: true,
                      }),
                       new TextRun({
                        text: `${new Date().toLocaleDateString()}`,
                        bold: true,
                      }),
                       new TextRun({
                        text: `${classificationLabel}`,
                        bold: true,
                      })
                    ],
                     alignment: AlignmentType.CENTER
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: currentAgreement.title,
                    size: 48,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              ...sections.map((section) => {
                return new Paragraph({
                  children: [
                    new TextRun({
                      text: section.name,
                      bold: true,
                    }),
                    new TextRun({
                      text: section.content,
                      break: 1,
                    }),
                    new TextRun({
                      text: `Classification Marking: ${section.classificationMarking}`,
                      break: 1,
                    })
                  ]
                });
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${currentAgreement.title}.docx`;
      link.click();
    };

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

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleExportPDF}>
              Export to PDF
            </Button>
            <Button sx={{ ml: 2}} variant="contained" color="primary" onClick={handleExportDOCX}>
              Export to DOCX
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <WizardNavigation />
        </Box>
      );
};

export default ReviewExportStep;
