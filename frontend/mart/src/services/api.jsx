import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend API URL
});

export const fetchProducts = async (category, top, minPrice, maxPrice) => {
  try {
    const response = await api.get(`/categories/${category}/products, {
      params: { top, minPrice, maxPrice },
    }`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};