import { configureStore } from "@reduxjs/toolkit";
import storeSlice from "./store-slice";
import LoginSlice from "./login-slice";
import CartSlice from "./cart-slice";
export default configureStore({
  reducer: {
    isShow: storeSlice,
    login: LoginSlice,
    cart: CartSlice,
  },
});
