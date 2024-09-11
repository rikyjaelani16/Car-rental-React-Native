import { createSlice } from "@reduxjs/toolkit";
import { fetchlogin } from "./AuthApi";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
const getStore = () =>
  SecureStore.getItem("login") && JSON.parse(SecureStore.getItem("login"));
const setStore = (value) => SecureStore.setItem("login", JSON.stringify(value));
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: getStore() ? getStore() : {},
    isModalVisible: false,
    islogin: getStore() ? true : false,
    isError: false,
    errorMessage: null,
  },
  reducers: {
    closeModal: (state) => {
      state.isModalVisible = false;
      state.isError = false;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.data = {};
      state.islogin = false;
      SecureStore.deleteItemAsync("login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchlogin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchlogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.islogin = true;
      state.data = action.payload;
      setStore(action.payload);
      state.isModalVisible = true;
    });
    builder.addCase(fetchlogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      state.isModalVisible = true;
    });
  },
});
export { fetchlogin };
export const { closeModal, logout } = loginSlice.actions;
export const selectlogin = (state) => state.login;
export default loginSlice.reducer;
