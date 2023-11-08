import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import redux-thunk

import adminReducer from './Admin/AdminLoginSlice';
import productReducer from './Admin/ProductsSlice';
import sliderReducer from './Admin/SliderSlice';


const store = configureStore({
  reducer: {
    admin: adminReducer,
    products:productReducer,
    slider:sliderReducer,

  },
  middleware: [thunk], // Apply redux-thunk middleware directly
});

export default store;
