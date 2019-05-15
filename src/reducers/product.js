import {
  ADD_LIKE,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  CHANGE_CATEGORY,
} from '../actions/types';

const initialState = {
  likes: 0,
  likedProducts: [],
  category: null,
  products: {
    loading: false,
    data: [],
    totalPages: 0,
    currentPage: 0,
    itensOnPage: 0,
    error: false,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE:
      return {
        ...state,
        likes: state.likes + 1,
        likedProducts: [...state.likedProducts, action.product.productId]
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          error: false,
          loading: true
        }
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: action.payload.hits,
          totalPages: action.payload.nbPages,
          currentPage: action.payload.page,
          itensOnPage: state.products.itensOnPage + action.payload.hits.length
        }
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: true
        }
      }
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: state.category === action.payload ? null : action.payload
      }
    default:
      return state
  }
};
