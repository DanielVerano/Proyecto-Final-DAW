import React, { useContext, useEffect, useReducer } from 'react'
import { useProductsContext } from "../context/products_context";
import reducer from "../reducers/filters_reducer";

const initial_state = {
  all_products: [],
  filtered_products: [],
  filters: {
    text: '',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0
  }
}

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: 'FILTER_PRODUCTS' });
  }, [products, state.filters]);

  const updateFilters = (e) => {
    const tag = e.target.name;
    let value = e.target.value;

    if (tag === 'price') value = Number(value);

    dispatch({ type: 'UPDATE_FILTERS', payload: { tag, value } });
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }

  return (
    <FilterContext.Provider value={{ ...state, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext);
}