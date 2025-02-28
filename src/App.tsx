import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { store } from './store/store';
import Dashboard from './pages/Dashboard';
import WizardPage from './pages/WizardPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
