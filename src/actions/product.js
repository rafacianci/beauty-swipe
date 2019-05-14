import {
  ADD_LIKE,
} from './types';

export const addLike = product => ({
  type: ADD_LIKE,
  product
});
