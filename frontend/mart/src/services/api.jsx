import axios from 'axios';

const api = axios.create({
  baseURL: `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice};
`});

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