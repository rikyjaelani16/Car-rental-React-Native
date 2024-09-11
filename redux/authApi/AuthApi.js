import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchlogin = createAsyncThunk(
  "fetchlogin",
  async (formData, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `https://api-car-rental.binaracademy.org/customer/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const body = await req.json();
      console.log(body, formData);
      if (!req.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);
