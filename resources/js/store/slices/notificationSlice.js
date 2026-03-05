import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    pushNotification: (state, action) => {
      state.push({ id: Date.now(), type: action.payload.type, message: action.payload.message });
    },
    dismissNotification: (state, action) => state.filter((n) => n.id !== action.payload),
  },
});

export const { pushNotification, dismissNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
