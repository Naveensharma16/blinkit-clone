import { createSlice } from "@reduxjs/toolkit";

const foundaddress = localStorage.getItem("address");

const initialState = {
  address: foundaddress === null ? "" : foundaddress,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export default addressSlice.reducer;
export const { addAddress } = addressSlice.actions;
