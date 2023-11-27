import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart:
    localStorage.getItem("cart") === null
      ? []
      : JSON.parse(localStorage.getItem("cart")),
  total:
    localStorage.getItem("carttotal") === null
      ? 0
      : JSON.parse(localStorage.getItem("carttotal")),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const founditem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (founditem === undefined) {
        state.cart = [...state.cart, action.payload];

        let total = 0;
        state.cart.forEach((item) => {
          total += item.total;
        });

        state.total = Math.floor(total);

        // saving added item in localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("carttotal", JSON.stringify(state.total));
      }
    },
    incrementQuantity: (state, action) => {
      const updatedcart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.qty + 1,
            get total() {
              return this.quantity * this.price;
            },
          };
        }
        return item;
      });

      state.cart = updatedcart;

      let total = 0;
      state.cart.forEach((item) => {
        total += item.total;
      });

      state.total = Math.floor(total);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("carttotal", JSON.stringify(state.total));
    },
    decrementQuantity: (state, action) => {
      const updatedcart = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.qty - 1,
              get total() {
                return this.quantity * this.price;
              },
            };
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);

      state.cart = updatedcart;

      let total = 0;
      state.cart.forEach((item) => {
        total += item.total;
      });

      state.total = Math.floor(total);

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("carttotal", JSON.stringify(state.total));
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;

      localStorage.removeItem("cart", JSON.stringify(state.cart));
      localStorage.removeItem("carttotal", JSON.stringify(state.total));
    },
  },
});

export default cartSlice.reducer;
export const { addItem, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;
