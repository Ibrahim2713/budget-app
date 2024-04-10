// store.js
import { createStore } from 'redux';
import rootReducer from './reducers/IncomeReducer';

const store = createStore(rootReducer);

export default store;
