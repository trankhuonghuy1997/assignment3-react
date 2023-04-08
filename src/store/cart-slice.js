import { createSlice } from "@reduxjs/toolkit";

// initial state
const initiaCartlState = {
  id: "",
  name: "",
  price: 0,
  amount: 0,
  image: "",
};

// create slice
const CartSlice = createSlice({
  name: "cart",
  initialState: initiaCartlState,
  reducers: {
    // add cart function
    ADD_CART: (state, actions) => {
      state.id = actions.payload._id.$oid;
      state.name = actions.payload.name;
      state.price = actions.payload.price;
      state.amount = actions.payload.amount;
      state.image = actions.payload.img1;
    },

    // increment handler: +1 to product.amount
    increment: (state, actions) => {
      actions.payload.amount = +actions.payload.amount + 1;
    },

    // decrement handler: -1 to product.amount
    decrement: (state, actions) => {
      actions.payload.amount = +actions.payload.amount - 1;
    },

    DELETE_CART: (state, actions) => {
      return actions.payload;
    },
  },
});

export const cartSliceAction = CartSlice.actions;
export default CartSlice.reducer;
