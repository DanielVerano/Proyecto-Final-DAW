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
    return {
      ...state,
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