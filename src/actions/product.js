import axios from 'axios';

import {
  ADD_LIKE,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  CHANGE_CATEGORY,
} from './types';

export const addLike = product => ({
  type: ADD_LIKE,
  product
});

export const getProducts = (page = 0, category) => async dispatch => {
  dispatch({ type: GET_PRODUCTS });

  try {
    const { data } = await axios.get(`products?page=${page}&hitsPerPage=20${category ? `&subcategory=${category}` : ''}`);

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const changeCategory = category => ({
  type: CHANGE_CATEGORY,
  payload: category
});
