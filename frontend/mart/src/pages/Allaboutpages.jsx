import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../Components/ProductCard';
import { fetchProducts } from '../services/api';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts('all', 10, 0, 10000) // Example parameters for initial fetch
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Products</Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllProductsPage;