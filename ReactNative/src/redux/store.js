import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {booksReducer} from './booksReducer';

export const store = createStore(booksReducer, applyMiddleware(reduxThunk));
