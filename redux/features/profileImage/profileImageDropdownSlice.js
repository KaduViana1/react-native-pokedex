import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const profileImageDropdownSlice = createSlice({
  name: 'profileImageDropdown',
  initialState,
  reducers: {
    toggleDropdown: state => {
      state.open = !state.open;
    },
  },
});

export default profileImageDropdownSlice.reducer;
export const { toggleDropdown } = profileImageDropdownSlice.actions;
