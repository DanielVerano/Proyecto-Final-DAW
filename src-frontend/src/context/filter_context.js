import React, { useContext, useEffect, useReducer } from 'react'
import { useProductsContext } from "../context/products_context";
import reducer from "../reducers/filters_reducer";

const initial_state = {
  all_products: [],
  filtered_products: [],
  filters: {}
}

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext);
}