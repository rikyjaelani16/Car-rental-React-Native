import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";
import * as SecureStore from "expo-secure-store";

const initialState = {
  isLoading: false,
  carId: null,
  // startRent: null,
  // endRent: null,
  data: {},
  slip: {},
  // paymentCountdown: null,
  // paymentMethod: null,
  // verificationCountdown: null,
  errorMessage: null,
  currentStep: null,
  selectedBank: null,
  promo: null,
  status: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByname: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.slip = action.payload;
      state.status = "upload-success";
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export { postOrder, putOrderSlip };
export const { setCarId, setStateByname, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
