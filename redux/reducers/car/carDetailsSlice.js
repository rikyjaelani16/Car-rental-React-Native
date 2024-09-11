import { createSlice } from "@reduxjs/toolkit";
import { fetchCarDetails } from "./carApi";

const carDetailsSlice = createSlice({
  name: "carDetails",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
    errorMessage: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarDetails.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCarDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCarDetails.rejected, (state, action) => {
      state.isLoading = true;
      state.errorMessage = action.error;
    });
  },
});
export const getCarsDetails = fetchCarDetails;
export const selectCarsDetails = (state) => state.carDetails;
export default carDetailsSlice.reducer;
