import {
  ADD_LIKE,
} from '../actions/types';

const initialState = {
  likes: 0,
  likedProducts: []
};

export default (state = initialState, action) => {
  if (action.type === ADD_LIKE) {
    return {
      ...state,
      likes: state.likes + 1,
      likedProducts: [...state.likedProducts, action.product.productId]
    };
  }

  return state;
};
