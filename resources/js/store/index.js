import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import entitiesReducer from './slices/entitiesSlice';
import notificationReducer from './slices/notificationSlice';
import systemReducer from './slices/systemSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    system: systemReducer,
    entities: entitiesReducer,
    notifications: notificationReducer,
  },
});
