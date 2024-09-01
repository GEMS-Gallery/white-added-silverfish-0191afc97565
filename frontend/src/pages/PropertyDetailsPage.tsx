import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Property {
  id: bigint;
  propertyType: string;
  location: string;
  size: number;
  price: number;
  description: string | null;
  imageUrl: string | null;
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          const result = await backend.getProperty(BigInt(id));
          if ('ok' in result) {
            setProperty(result.ok);
          } else {
            console.error('Property not found');
          }
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={property.imageUrl || 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUyMzExMzJ8&ixlib=rb-4.0.3'}
              alt={property.propertyType}
              style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {property.propertyType}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {property.location}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Size:</strong> {property.size} sqft
              </Typography>
              <Typography variant="body1">
                <strong>Price:</strong> ${property.price.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                <strong>Description:</strong>
              </Typography>
              <Typography variant="body2">{property.description || 'No description available.'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PropertyDetailsPage;
