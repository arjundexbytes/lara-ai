import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import systemReducer from './slices/systemSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    system: systemReducer,
  },
});
