import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import './index.css';

import App from './App';
import { UserProvider } from "./context/user_context";
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);