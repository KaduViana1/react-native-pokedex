import { configureStore } from '@reduxjs/toolkit';
import profileImageReducer from '../features/profileImage/profileImageSlice';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistReducer(persistConfig, profileImageReducer);

const store = configureStore({
  reducer: { profileImage: persistedReducer },
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
