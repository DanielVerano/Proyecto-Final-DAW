import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducers/products_reducer'
import { apiUrl as url, baseUrl } from '../utils/constants'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async (url) => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });

    try {
      const response = await axios.get(`${url}/products`);
      let products = response.data;
      products = products.map((product) => {
        product.image = `${baseUrl}${product.image}`;
        return product;
      });
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  }

  const fetchSingleProduct = async (id) => {
    dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' });

    try {
      const resp = await axios.get(`${url}/products/${id}`);
      const product = resp.data;
      product.image = `${baseUrl}${product.image}`;
      dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: resp.data });
    } catch (error) {
      dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' });
    }
  }

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext);
}