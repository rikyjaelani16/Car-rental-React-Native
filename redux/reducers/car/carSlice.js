import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carApi";
import { isLoading } from "expo-font";

const carSlice = createSlice({
  name: "car",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    errorMessage: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.isLoading = true;
      state.errorMessage = action.error;
    });
  },
});
export const getCars = fetchCars;
export const selectCars = (state) => state.car;
export default carSlice.reducer;
