import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../components/layout/Layout';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

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
        <Typography variant="body1" color="text.secondary">
          You haven't created any agreements yet.
        </Typography>
      </Box>
    </Layout>
  );
};

export default Dashboard;