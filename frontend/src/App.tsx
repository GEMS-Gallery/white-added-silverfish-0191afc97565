import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PropertyListingsPage from './pages/PropertyListingsPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AddPropertyPage from './pages/AddPropertyPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
    },
    secondary: {
      main: '#3498DB',
    },
    error: {
      main: '#E74C3C',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertyListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
