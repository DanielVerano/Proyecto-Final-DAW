import React, { useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducers/products_reducer'
import { apiUrl as url } from '../utils/constants'

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
      const products = response.data;
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  }

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext);
}