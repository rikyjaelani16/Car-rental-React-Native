import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("fetchCars", async (signal) => {
  const res = await fetch(
    `https://api-car-rental.binaracademy.org/customer/car`,
    { signal: signal }
  );
  return res?.json();
});
export const fetchCarDetails = createAsyncThunk(
  "fetchCarsDetails",
  async (payLoad) => {
    const res = await fetch(
      `https://api-car-rental.binaracademy.org/customer/car/` + payLoad
    );
    return res?.json();
  }
);
