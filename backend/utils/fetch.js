const axios = require('axios');
const cache = require('./cache');

// Replace with your actual e-commerce API URLs
const ECOMMERCE_APIS = [
  'http://api1.example.com',
  'http://api2.example.com',
  'http://api3.example.com',
  'http://api4.example.com',
  'http://api5.example.com'
];

// Fetch data from all e-commerce APIs for a specific category
const fetchData = async (category) => {
  const promises = ECOMMERCE_APIS.map(api =>
    axios.get(`${api}/categories/${category}/products`)
  );

  try {
    const results = await Promise.all(promises);
    const products = results.flatMap(result => result.data);
    return products;
  } catch (error) {
    console.error('Error fetching data from e-commerce APIs:', error);
    throw error;
  }
};

module.exports = fetchData;