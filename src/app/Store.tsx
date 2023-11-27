import { configureStore } from "@reduxjs/toolkit";

import addressReducer from "../features/address/addressSlice.tsx";
import cartReducer from "../features/Cart/cartSlice.tsx";

const store = configureStore({
  reducer: {
    address: addressReducer,
    cart: cartReducer,
  },
});

export default store;
