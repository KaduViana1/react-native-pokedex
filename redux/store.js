import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import profileImageReducer from './features/profileImage/profileImageSlice';
import profileImageDropdownReducer from './features/profileImage/profileImageDropdownSlice';
import sideBarModalReducer from './features/sideBar/sideBarModalSlice';

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
};

const rootReducer = combineReducers({
  profileImage: profileImageReducer,
  profileImageDropdown: profileImageDropdownReducer,
  sideBarModal: sideBarModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
