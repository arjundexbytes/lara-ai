import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import entitiesReducer from './slices/entitiesSlice';
import systemReducer from './slices/systemSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    system: systemReducer,
    entities: entitiesReducer,
  },
});
