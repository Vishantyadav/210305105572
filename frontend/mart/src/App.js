import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './pages/Allaboutpages';
import ProductDetailPage from './pages/productdetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProductsPage} />
        <Route exact path="/products/:productId" component={ProductDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;