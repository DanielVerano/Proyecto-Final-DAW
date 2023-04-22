import React from 'react'

const filters_reducer = (state, action) => {
  if (action.type === 'LOAD_PRODUCTS') {
    const max_price = Math.max(...action.payload.map((p) => p.price));

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price,
        price: max_price
      }
    }
  }

  if (action.type === 'FILTER_PRODUCTS') {
    const { all_products } = state;
    const { text, category, price } = state.filters;
    let tempProducts = [...all_products];

    if (text) tempProducts = tempProducts.filter((p) => p.name.toLowerCase().startsWith(text));
    if (category !== 'all') tempProducts = tempProducts.filter((p) => p.category === category);
    if (price < state.filters.max_price) tempProducts = tempProducts.filter((p) => p.price <= price);

    return {
      ...state, filtered_products: tempProducts
    }
  }

  if (action.type === 'UPDATE_FILTERS') {
    const { tag, value } = action.payload;

    return {
      ...state,
      filters: {
        ...state.filters,
        [tag]: value
      }
    }
  }

  if (action.type === 'CLEAR_FILTERS') {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        price: state.filters.max_price,
      }
    }
  }
  throw new Error(`No matching action ${action.type}`);
}

export default filters_reducer