import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AIService, GenerationResponse } from '../../services/AIService';
import { updateAgreementWithAIContent } from '../../store/slices/agreementSlice';

const AIAssistant: React.FC = () => {
  const dispatch = useDispatch();
  const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);
  
  // Local state
  const [requirement, setRequirement] = useState('');
  const [requirements, setRequirements] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Add a requirement
  const addRequirement = () => {
    if (requirement.trim() && !requirements.includes(requirement.trim())) {
      setRequirements([...requirements, requirement.trim()]);
      setRequirement('');
    }
  };
  
  // Remove a requirement
  const removeRequirement = (index: number) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);
    setRequirements(newRequirements);
  };
  
  // Handle key press (Enter) to add requirement
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addRequirement();
    }
  };
  
  // Generate content based on requirements
  const generateContent = async () => {
    if (!currentAgreement) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await AIService.generateContent({
        agreementType: currentAgreement.type,
        requirements
      });
      
      setGeneratedContent(response);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Error generating content:', err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Apply generated content to the agreement
  const applyGeneratedContent = () => {
    if (!generatedContent || !generatedContent.sections) return;
    
    dispatch(updateAgreementWithAIContent(generatedContent.sections));
    
    // Show success message or notification
    alert('Content applied to agreement successfully!');
  };
  
  // Render requirements list
  const renderRequirements = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      {requirements.map((req, index) => (
        <Chip
          key={index}
          label={req}
          onDelete={() => removeRequirement(index)}
          deleteIcon={<DeleteIcon />}
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>
  );
  
  // Render generated content preview
  const renderGeneratedContent = () => {
    if (!generatedContent) return null;
    
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Generated Content Preview
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {generatedContent.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {section.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {section.content}
            </Typography>
          </Box>
        ))}
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={applyGeneratedContent}
          >
            Update Background & Purpose Sections
          </Button>
        </Box>
      </Box>
    );
  };
  
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        AI Content Assistant
      </Typography>
      
      <Typography variant="body1" paragraph>
        Describe your requirements for this agreement, and our AI will help generate content for the Background and Purpose and Scope sections.
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        The AI will replace the content of these sections with generated text that includes your requirements and automatically uses the party acronyms you've entered.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          label="Add a requirement"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isGenerating}
        />
        <IconButton 
          color="primary" 
          onClick={addRequirement}
          disabled={!requirement.trim() || isGenerating}
          sx={{ ml: 1 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      {requirements.length > 0 && renderRequirements()}
      
      <Button
        variant="contained"
        color="primary"
        onClick={generateContent}
        disabled={isGenerating || requirements.length === 0}
        startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isGenerating ? 'Generating...' : 'Generate Content'}
      </Button>
      
      {generatedContent && renderGeneratedContent()}
    </Paper>
  );
};

export default AIAssistant;
