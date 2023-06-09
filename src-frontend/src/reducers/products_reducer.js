const products_reducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, products_loading: true }
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    return { ...state, products_loading: false, products: action.payload }
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
    return { ...state, products_loading: false, products_error: true }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_BEGIN') {
    return { ...state, single_product_loading: true, single_product_error: false }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_SUCCESS') {
    return { ...state, single_product: action.payload, single_product_loading: false }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_ERROR') {
    return { ...state, single_product_loading: false, single_product_error: true }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_REVIEWS_SUCCESS') {
    return { ...state, single_product_reviews: action.payload }
  }

  throw new Error(`No matching action ${action.type}`);
}

export default products_reducer;