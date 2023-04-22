import React from 'react'

const filters_reducer = (state, action) => {
  if (action.type === 'LOAD_PRODUCTS') {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters }
    }
  }
  return state;
  throw new Error(`No matching action ${action.type}`);
}

export default filters_reducer