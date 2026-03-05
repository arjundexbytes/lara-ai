import { createSlice } from '@reduxjs/toolkit';

const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    users: [
      { id: 1, name: 'Admin User', email: 'admin@example.com', roles: ['admin'] },
      { id: 2, name: 'Ops Manager', email: 'manager@example.com', roles: ['manager'] },
    ],
    products: [
      { id: 1, name: 'Enterprise Widget', category: 'Hardware', price: 199.99 },
      { id: 2, name: 'AI Support Plan', category: 'Services', price: 999.0 },
    ],
    orders: [
      { id: 1, status: 'completed', total: 1198.99, user_id: 1 },
      { id: 2, status: 'processing', total: 199.99, user_id: 2 },
    ],
  },
  reducers: {},
});

export default entitiesSlice.reducer;
