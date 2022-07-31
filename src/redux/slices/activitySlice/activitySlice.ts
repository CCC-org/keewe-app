import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActivityTagInterface, ActivityTags } from '../../../constants/ActivitySelection/tags';

interface ISelectActivityTagPayload {
  tagId: number;
  isChecked: boolean;
  genre: string;
}

const initialState = ActivityTags;

const activitySlice = createSlice({
  name: 'activitySelection',
  initialState,
  reducers: {
    selectActivityTag(state, action: PayloadAction<ISelectActivityTagPayload>) {
      const { tagId, isChecked, genre } = action.payload;
      const tag = state[genre].groupTags.find((tag: ActivityTagInterface) => tag.id === tagId);
      if (tag) {
        tag.isChecked = !isChecked;
      }
    },
  },
});

export const { selectActivityTag } = activitySlice.actions;
export default activitySlice.reducer;
