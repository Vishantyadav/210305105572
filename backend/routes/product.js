const express = require('express');
const fetchData = require('../utils/fetchData');
const cache = require('../utils/cache');
const generateId = require('../utils/generateId');

const router = express.Router();

router.get('/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { top = 10, page = 1, sort, order = 'asc' } = req.query;
  const cacheKey = ${categoryname}-${top}-${page}-${sort}-${order};

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const products = await fetchData(categoryname);

    products.forEach(product => {
      product.id = generateId();
    });

    if (sort) {
      products.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] - b[sort];
        } else {
          return b[sort] - a[sort];
        }
      });
    }


    const startIndex = (page - 1) * top;
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(top, 10));

    cache.set(cacheKey, paginatedProducts);
    res.json(paginatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.get('/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;
  const cacheKey = ${categoryname}-${productid};

  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const products = await fetchData(categoryname);
    const product = products.find(p => p.id === productid);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    cache.set(cacheKey, product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

module.exports = router;