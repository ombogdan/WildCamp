import {createSlice} from '@reduxjs/toolkit';
import { HomeState } from './types';

const initialState: HomeState = {
  searchProductSelect: {},
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSearchProductSelect(state, action): void {
      state.searchProductSelect = action.payload;
    },
  }
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
