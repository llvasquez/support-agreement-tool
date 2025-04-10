import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import Layout from '../components/layout/Layout';
import { RootState } from '../store/store';
import { loadAgreement } from '../store/slices/agreementSlice';
import { setCurrentStep } from '../store/slices/wizardSlice';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedAgreements = useSelector((state: RootState) => state.agreement.savedAgreements);

  return (
    <Layout showSidebar={false}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h1" color="text.primary">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/wizard')}
          >
            New Agreement
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Quick Start
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h2" color="primary.main" gutterBottom>
                    Create MOA
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Memorandum of Agreement - Used when transfer of funds or reimbursement is involved.
                  </Typography>
                  <Button variant="outlined" color="primary" onClick={() => navigate('/wizard')}>
                    Start New MOA
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h2" color="primary.main" gutterBottom>
                    Create MOU
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Memorandum of Understanding - Used when no transfer of funds between parties is involved.
                  </Typography>
                  <Button variant="outlined" color="primary" onClick={() => navigate('/wizard')}>
                    Start New MOU
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h2" gutterBottom>
          Recent Agreements
        </Typography>
        {savedAgreements.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            You haven't created any agreements yet.
          </Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {savedAgreements.map((agreement) => (
              <React.Fragment key={agreement.id}>
                <ListItem
                  button
                  onClick={() => {
                    // Load the selected agreement
                    dispatch(loadAgreement(agreement.id));
                    // Set the wizard to the first step so user can go through the entire process
                    dispatch(setCurrentStep(1));
                    // Navigate to the wizard page
                    navigate('/wizard');
                  }}
                  sx={{ py: 2 }}
                >
                  <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="div">
                        {agreement.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Type: {agreement.type}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Created: {new Date(agreement.createdDate).toLocaleDateString()}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Last Modified: {new Date(agreement.lastModifiedDate).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Layout>
  );
};

export default Dashboard;