import { createSlice } from "@reduxjs/toolkit";
const initialShowState = { isShow: false };

// create slice
const StoreSlice = createSlice({
  name: "show",
  initialState: initialShowState,
  reducers: {
    // show function: set state to true
    show: (state) => {
      state.isShow = true;
    },

    // hide function: set state to false
    hide: (state) => {
      state.isShow = false;
    },
  },
});

export const showModalAction = StoreSlice.actions;

export default StoreSlice.reducer;
