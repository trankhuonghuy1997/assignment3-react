import { createSlice } from "@reduxjs/toolkit";
const initialLoginState = { isLogin: false };

// create slice
const LoginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    // login function set state to true
    login: (state) => {
      state.isLogin = true;
    },

    // logout function set state to false
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const loginAction = LoginSlice.actions;
export default LoginSlice.reducer;
