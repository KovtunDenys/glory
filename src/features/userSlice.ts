// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

const initialState: User = {
  id: 0,
  points: 0,
  userName:'',
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
      state.id = action.payload.id || 0;
      state.userName = action.payload.userName || '';
      state.points = action.payload.points || 0;
      state.lastMining = action.payload.lastMining || undefined;
      state.invitedFriends = action.payload.invitedFriends || [];
      state.tikTokSubs = action.payload.tikTokSubs || false;
      state.instagramSubs = action.payload.instagramSubs || false;
      state.youTubeSubs = action.payload.youTubeSubs || false;
    },

    addPoints: (state, action: PayloadAction<{ points: number }>) => {
      state.points += action.payload.points;
      state.lastMining = new Date();
    },

    updateSubscription: (state, action: PayloadAction<string>) => {
      const platform = action.payload;
      // Мы используем индексную подпись для работы с динамическим ключом
      (state as any)[platform] = true; // Обновляем подписку на платформу
    },
  },
});

export const { setUser, addPoints, updateSubscription } = userSlice.actions;

export default userSlice.reducer;
