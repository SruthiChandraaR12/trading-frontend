import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchTrades = createAsyncThunk('trades/fetchTrades', async () => {
  const res = await api.get('/trades');
  return res.data;
});

export const createTrade = createAsyncThunk('trades/createTrade', async (trade) => {
  const res = await api.post('/trades', trade);
  return res.data;
});

export const updateTrade = createAsyncThunk('trades/updateTrade', async ({ id, trade }) => {
  const res = await api.put(`/trades/${id}`, trade);
  return res.data;
});

export const deleteTrade = createAsyncThunk('trades/deleteTrade', async (id) => {
  await api.delete(`/trades/${id}`);
  return id;
});

const tradesSlice = createSlice({
  name: 'trades',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTrades.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchTrades.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(createTrade.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateTrade.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteTrade.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  }
});

export default tradesSlice.reducer;