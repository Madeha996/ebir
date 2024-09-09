// authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, LoginRequest } from "@app/api/auth.api";
import { setUser } from "@app/store/slices/userSlice";
import {
  deleteToken,
  deleteUser,
  persistToken,
} from "@app/services/localStorage.service";

export interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: null,
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const res = await login(loginPayload);
      dispatch(setUser(res.user));
      persistToken(res.token);
      return res.token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const doLogout = createAsyncThunk(
  "auth/doLogout",
  async (_, { dispatch }) => {
    deleteToken();
    deleteUser();
    dispatch(setUser(null));
    return null; // Ensure the promise resolves with null
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = null; // Correctly update token to null on logout
    });
  },
});

export default authSlice.reducer;
