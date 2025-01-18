import { configureStore,} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './userSlice';
//import firebaseReducer from '../firebase/firebaseSlice';


const persistConfig = {
  key: 'user', 
  storage, 
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer, 
    // firebase: persistedReducer, 
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

