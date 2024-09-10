import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, LoginRequest } from "@app/api/auth.api";
import { UserModel } from "@app/domain/UserModel"; // Assuming this is the correct path
import {
  deleteToken,
  deleteUser,
  persistToken,
  readToken,
  persistUser,
  readUser,
} from "@app/services/localStorage.service";

// Define the shape of the AuthSlice
export interface AuthSlice {
  token: string | null;
  user: UserModel | null; // Use UserModel directly
}

// Read token and user from local storage if available during initialization
const initialState: AuthSlice = {
  token: readToken(),
  user: readUser(), // This should return a UserModel or null
};

// Async login action to handle API request and persist token and user
export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await login(loginPayload); // Ensure 'res.user' matches UserModel
      persistToken(res.token);
      persistUser(res.user); // Make sure this is being called
      return { token: res.token, user: res.user }; // Return both token and user
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async logout action to clear the token and user data
export const doLogout = createAsyncThunk("auth/doLogout", async () => {
  deleteToken();
  deleteUser();
  return { token: null, user: null }; // Clear token and user
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
