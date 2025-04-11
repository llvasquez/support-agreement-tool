import React, { useState } from 'react';
import {
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    LinearProgress,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ClassificationLevel, Section, Agreement, getClassificationLabel, AgreementType } from '../../types/types';

import { jsPDF } from 'jspdf';
import * as docx from 'docx';
import { MOA_TEMPLATE, getTemplateByType } from '../../data/agreementTemplates';
import { resetWizard, setCurrentStep } from '../../store/slices/wizardSlice';
import { clearCurrentAgreement, saveAgreement, setDisplayName } from '../../store/slices/agreementSlice';
import HomeIcon from '@mui/icons-material/Home';
import Notification from '../common/Notification';

const ReviewExportStep: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);

    // State for notification
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'info' | 'warning' | 'error'
    });

    // State for save dialog
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [agreementDisplayName, setAgreementDisplayName] = useState(
        currentAgreement?.displayName ||
        currentAgreement?.title ||
        `${currentAgreement?.type || 'Agreement'} - ${new Date().toLocaleDateString()}`
    );

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
        let yPosition = 40; // Starting y position
        // Add Title Block
            doc.setFontSize(10);
             doc.text(`${currentAgreement.title}`, 10, yPosition);
            yPosition = yPosition + 10;
            doc.text(`BETWEEN THE`, 10, yPosition);
            yPosition = yPosition + 10;
             doc.text(`${currentAgreement.firstParty}(${currentAgreement.firstPartyAcronym})`, 10, yPosition);
            yPosition = yPosition + 10;
            doc.text("AND", 10, yPosition);
            yPosition = yPosition + 10;
            doc.text(`THE ${currentAgreement.secondParty}(${currentAgreement.secondPartyAcronym})`, 10, yPosition);
            yPosition = yPosition + 10;
            doc.text("FOR", 10, yPosition);
            yPosition = yPosition + 10;
             doc.text(`${currentAgreement.subject} ${currentAgreement.agreementNumber}`, 10, yPosition);
              yPosition = yPosition + 10;
            currentAgreement.sections.forEach((section) => {
                yPosition = yPosition + 10;
                const sectionName = doc.splitTextToSize(`${section.name}`, 180);
                doc.text(sectionName, 10, yPosition);
                yPosition = yPosition + sectionName.length * 5; // Adjust for content height
                const sectionContent = doc.splitTextToSize(section.content, 180);
                doc.text(sectionContent, 10, yPosition);
                yPosition = yPosition + sectionContent.length * 5; // Adjust for content height
                const sectionClassification = doc.splitTextToSize(`Classification Marking: ${section.classificationMarking}`, 180);
                doc.text(sectionClassification, 10, yPosition);
                yPosition = yPosition + sectionClassification.length * 5; // Adjust for classification height
            });
            doc.save(`${currentAgreement.title}.pdf`);
    };

    // Function to handle DOCX export
    const handleExportDOCX = async () => {
        if (!currentAgreement) return;
        const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType } = docx;
        const { sections } = currentAgreement;
         const childrenArray: docx.Paragraph[] = [];
        //Add template title
        childrenArray.push(new Paragraph({
            children: [new TextRun({ text: currentAgreement.title, size: 28 })],
            alignment: AlignmentType.CENTER,
        }));
        //Add between
         childrenArray.push(new Paragraph({
            children: [new TextRun({ text: "BETWEEN", size: 28 })],
            alignment: AlignmentType.CENTER,
        }));
         //Add First Party
          childrenArray.push(new Paragraph({
            children: [
              new TextRun({ text: "THE ", size: 28 }),
              new TextRun({ text: currentAgreement.firstParty, size: 28 }),
              new TextRun({ text: " (", size: 28 }),
              new TextRun({ text: currentAgreement.firstPartyAcronym, size: 28 }),
              new TextRun({ text: ")", size: 28 }),
            ],
            alignment: AlignmentType.CENTER,
          }));
          //Add and
          childrenArray.push(new Paragraph({
             children: [new TextRun({ text: "AND", size: 28 })],
            alignment: AlignmentType.CENTER,
          }));
           //Add second party
            childrenArray.push(new Paragraph({
             children: [
              new TextRun({ text: "THE ", size: 28 }),
                new TextRun({ text: currentAgreement.secondParty, size: 28 }),
                new TextRun({ text: " (", size: 28 }),
                new TextRun({ text: currentAgreement.secondPartyAcronym, size: 28 }),
                new TextRun({ text: ")", size: 28 }),
             ],
             alignment: AlignmentType.CENTER,
          }));
         //Add For
            childrenArray.push(new Paragraph({
            children: [new TextRun({ text: "FOR", size: 28 })],
            alignment: AlignmentType.CENTER,
        }));
        //Add Subject
        childrenArray.push(new Paragraph({
            children: [new TextRun({ text: currentAgreement.subject, size: 28 })],
            alignment: AlignmentType.CENTER,
        }));
        //Add Agreement Number
        childrenArray.push(new Paragraph({
            children: [new TextRun({ text: currentAgreement.agreementNumber, size: 28 })],
            alignment: AlignmentType.CENTER,
        }));

          // Add all sections
          currentAgreement.sections
            .forEach((section) => {
              childrenArray.push(
                new Paragraph({
                  children: [
                    new TextRun({ text: section.name, bold: true }),
                    new TextRun({ text: section.content, break: 1 }),
                    new TextRun({ text: `Classification Marking: ${section.classificationMarking}`, break: 1 }),
                  ],
                }),
              );
            });

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
                    children: childrenArray,
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

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleExportPDF}>
                    Export to PDF
                </Button>
                <Button variant="contained" color="primary" onClick={handleExportDOCX}>
                    Export to DOCX
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSaveDialogOpen(true)}
                >
                    Save Agreement
                </Button>

                {/* Save Dialog */}
                <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
                    <DialogTitle>Save Agreement</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter a name for this agreement. This name will be displayed in the Recent Agreements list.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Agreement Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={agreementDisplayName}
                            onChange={(e) => setAgreementDisplayName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                // Set the display name
                                dispatch(setDisplayName(agreementDisplayName));
                                // Save the agreement
                                dispatch(saveAgreement());
                                // Close the dialog
                                setSaveDialogOpen(false);
                                // Show notification
                                setNotification({
                                    open: true,
                                    message: 'Agreement saved successfully!',
                                    severity: 'success'
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<HomeIcon />}
                    onClick={() => {
                        // Reset the wizard state
                        dispatch(resetWizard());
                        // Clear the current agreement
                        dispatch(clearCurrentAgreement());
                        // Navigate back to the dashboard
                        navigate('/dashboard');
                    }}
                >
                    Return to Start
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                            // Reset the wizard state
                            dispatch(resetWizard());
                            // Clear the current agreement
                            dispatch(clearCurrentAgreement());
                            // Navigate back to the dashboard
                            navigate('/dashboard');
                        }}
                        sx={{ borderColor: '#dddddd', color: '#555555' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => dispatch(setCurrentStep(3))}
                    >
                        Back
                    </Button>
                </Box>
            </Box>

            {/* Notification */}
            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification({ ...notification, open: false })}
            />
        </Box>
    );
};

export default ReviewExportStep;
