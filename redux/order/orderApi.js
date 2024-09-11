import { createAsyncThunk } from "@reduxjs/toolkit";

export const postOrder = createAsyncThunk(
  "postOrder",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      console.log(formData);
      const req = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", access_token: token },

          body: JSON.stringify({
            start_rent_at: formData.start_rent_at,
            finish_rent_at: formData.finish_rent_at,
            car_id: formData.car_id,
          }),
        }
      );
      const body = await req.json();

      if (!req.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const putOrderSlip = createAsyncThunk(
  "putOrderSlip",
  async ({ id, token, formData }, { rejectWithValue }) => {
    try {
      console.log(formData);

      const req = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order/` +
          id +
          "/slip",
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: token,
          },

          body: formData,
        }
      );
      const body = await req.json();

      if (!req.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
