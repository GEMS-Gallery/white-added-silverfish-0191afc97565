import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to LoopNet Clone
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your one-stop destination for commercial real estate
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/properties" size="large">
            Browse Properties
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/add-property" size="large" sx={{ ml: 2 }}>
            List Your Property
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 6 }}>
        <img src="https://images.unsplash.com/photo-1683022927277-1cc28a92daed?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUyMzExMzB8&ixlib=rb-4.0.3" alt="Featured Property" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        <Typography variant="caption" display="block" textAlign="right">
          Photo by <a href="https://unsplash.com/photos/a-white-wall-with-a-sign-that-says-gentum-poludinia-BnvfOuq_if4" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
