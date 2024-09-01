import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';

interface PropertyFormData {
  propertyType: string;
  location: string;
  size: number;
  price: number;
  description: string;
  imageUrl: string;
}

const AddPropertyPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<PropertyFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      const id = await backend.createProperty(
        data.propertyType,
        data.location,
        parseFloat(data.size.toString()),
        parseFloat(data.price.toString()),
        data.description ? [data.description] : [],
        data.imageUrl ? [data.imageUrl] : []
      );
      console.log('Property created with ID:', id);
      navigate(`/property/${id}`);
    } catch (error) {
      console.error('Error creating property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Add New Property
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="propertyType"
            control={control}
            defaultValue=""
            rules={{ required: 'Property type is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Type"
                fullWidth
                margin="normal"
                error={!!errors.propertyType}
                helperText={errors.propertyType?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: 'Location is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                margin="normal"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="size"
            control={control}
            defaultValue={0}
            rules={{ required: 'Size is required', min: { value: 1, message: 'Size must be greater than 0' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Size (sqft)"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.size}
                helperText={errors.size?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="price"
            control={control}
            defaultValue={0}
            rules={{ required: 'Price is required', min: { value: 1, message: 'Price must be greater than 0' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price ($)"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Controller
            name="imageUrl"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                fullWidth
                margin="normal"
              />
            )}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Property'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddPropertyPage;
