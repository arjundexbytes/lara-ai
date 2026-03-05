import { createSlice } from '@reduxjs/toolkit';

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    statuses: { db: null, redis: null, ai: null },
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatuses: (state, action) => {
      state.statuses = action.payload;
    },
  },
});

export const { setLoading, setStatuses } = systemSlice.actions;
export default systemSlice.reducer;
