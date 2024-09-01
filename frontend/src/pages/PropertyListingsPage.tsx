import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
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

const PropertyListingsPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const result = await backend.getProperties();
        setProperties(result);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Property Listings
      </Typography>
      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id.toString()}>
            <Card>
              <CardActionArea component={Link} to={`/property/${property.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={property.imageUrl || 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjUyMzExMzJ8&ixlib=rb-4.0.3'}
                  alt={property.propertyType}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.propertyType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Size: {property.size} sqft
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${property.price.toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PropertyListingsPage;
