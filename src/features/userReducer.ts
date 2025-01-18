// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

const initialState: User = {
  id: 0,
  points: 0,
  userName: '',
  lastMining: undefined,
  invitedFriends: [],
  youTubeSubs: false,
  tikTokSubs: false,
  instagramSubs: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    addPoints: (state, action: PayloadAction<{ points: number }>) => {
      state.points += action.payload.points;
      state.lastMining = new Date();
    },
    updateSubscription: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, addPoints, updateSubscription } = userSlice.actions;

export default userSlice.reducer;
