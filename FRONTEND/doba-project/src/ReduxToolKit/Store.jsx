import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import redux-thunk

import adminReducer from './Admin/AdminLoginSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
  middleware: [thunk], // Apply redux-thunk middleware directly
});

export default store;
