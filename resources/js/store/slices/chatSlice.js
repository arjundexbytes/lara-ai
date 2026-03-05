import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: { conversationId: `conv_${Date.now()}`, messages: [] },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetChat: (state) => {
      state.messages = [];
      state.conversationId = `conv_${Date.now()}`;
    },
  },
});

export const { addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
