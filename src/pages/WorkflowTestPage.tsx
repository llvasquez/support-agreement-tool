import React from 'react';
import { Box, Typography, Paper, Tabs, Tab, Button, Card, CardContent, Grid } from '@mui/material';
import Layout from '../components/layout/Layout';

const WorkflowTestPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout showSidebar={false}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          Workflow Engine
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Workflow Management
          </Typography>
          <Typography paragraph>
            The workflow engine allows you to automate the routing, review, approval, and signature processes for agreements.
            This feature is currently under development.
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Dashboard" />
            <Tab label="Templates" />
            <Tab label="Tasks" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert('Start workflow feature coming soon!')}
                >
                  Start Workflow
                </Button>
              </Box>

              <Typography variant="h3" gutterBottom>
                My Workflows
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Sample MOA with Agency X
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status: In Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Stage: Legal Review
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Started: June 15, 2023
                      </Typography>
                      <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Sample MOU with Agency Y
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status: Completed
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Completed: June 14, 2023
                      </Typography>
                      <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h3" gutterBottom>
                Workflow Templates
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Standard MOA Review Process
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        For Memorandum of Agreement
                      </Typography>
                      <Typography variant="body2" paragraph>
                        A standard review process for MOAs with 6 stages including legal, security, and partner reviews.
                      </Typography>
                      <Button variant="outlined" color="primary">
                        View Template
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Expedited MOU Review Process
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        For Memorandum of Understanding
                      </Typography>
                      <Typography variant="body2" paragraph>
                        An expedited review process for MOUs with 4 stages for faster processing.
                      </Typography>
                      <Button variant="outlined" color="primary">
                        View Template
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h3" gutterBottom>
                My Tasks
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Legal Review: Sample MOA with Agency X
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Due: June 20, 2023
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Review the agreement for legal compliance and risks.
                      </Typography>
                      <Button variant="contained" color="primary">
                        Review Task
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" color="primary.main" gutterBottom>
                        Initial Draft Review: Sample MOA with Agency Z
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Due: June 18, 2023
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Initial review of the draft agreement.
                      </Typography>
                      <Button variant="contained" color="primary">
                        Review Task
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h2" gutterBottom>
            Implementation Status
          </Typography>
          <Typography paragraph>
            The workflow engine is currently being implemented. The following features are planned:
          </Typography>
          <ul>
            <li>
              <Typography>Configurable workflow templates for different agreement types</Typography>
            </li>
            <li>
              <Typography>Automated routing based on agreement content and metadata</Typography>
            </li>
            <li>
              <Typography>Task assignment and notification system</Typography>
            </li>
            <li>
              <Typography>Approval tracking and audit trail</Typography>
            </li>
            <li>
              <Typography>Integration with document generation and e-signature</Typography>
            </li>
          </ul>
        </Paper>
      </Box>
    </Layout>
  );
};

export default WorkflowTestPage;
