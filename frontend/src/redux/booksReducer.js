import {GET_BOOKS} from './types';

const initialState = {
  data: [],
  loading: true,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {data: action.data, loading: false};

    default:
      return state;
  }
};
