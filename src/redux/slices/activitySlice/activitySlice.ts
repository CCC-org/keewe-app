import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActivityTags } from '../../../constants/ActivitySelection/tags';

const initialState = ActivityTags;

const activitySlice = createSlice({
  name: 'activitySelection',
  initialState,
  reducers: {
    select(state, action: PayloadAction<string>) {
      return state;
    },
  },
});

export const { select } = activitySlice.actions;
export default activitySlice.reducer;
