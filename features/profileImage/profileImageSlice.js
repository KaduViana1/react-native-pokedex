import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: null,
};

const profileImageSlice = createSlice({
  name: 'profileImage',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = { uri: action.payload };
    },
  },
});

export default profileImageSlice.reducer;
export const { setImage } = profileImageSlice.actions;
