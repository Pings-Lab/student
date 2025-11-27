import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiStack from "../../api/apiStack";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await apiStack.getUser();
  return res.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await apiStack.logout();
});


export const saveProfile = createAsyncThunk(
  "profile/save",
  async (data) => {
    const res = await profileApi.updateProfile(data);
    return res.data;
  }
);

