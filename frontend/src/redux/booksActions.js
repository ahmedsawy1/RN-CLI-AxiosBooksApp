import baseURL from '../server/baseURL';
import {GET_BOOKS} from './types';

export const getBooks = () => {
  return async (dispatch) => {
    const res = await fetch(`${baseURL}books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (!res.ok) {
      console.log('Not OK');
    }

    const data = await res.json();

    dispatch({
      type: GET_BOOKS,
      data: data,
    });
  };
};
export const addBook = (name, description, price, image) => {
  return async (dispatch) => {
    const res = await fetch(`${baseURL}books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image,
      }),
    });

    if (!res.ok) {
      console.log('Not OK');
    }

    const data = await res.json();
    console.log(data);

    dispatch({
      type: GET_BOOKS,
      //   name: name,
      //   description: description,
      //   price: price,
      //   image: image,
    });
  };
};
