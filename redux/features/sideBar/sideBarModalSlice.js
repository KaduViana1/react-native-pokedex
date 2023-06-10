import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const sideBarModalSlice = createSlice({
  name: 'sideBarModal',
  initialState,
  reducers: {
    toggleModal: state => {
      state.open = !state.open;
    },
  },
});

export default sideBarModalSlice.reducer;
export const { toggleModal } = sideBarModalSlice.actions;
