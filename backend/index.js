const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./src/routes/products');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use('/categories', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http ${PORT}`);
});