import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { auth } from "../configurations/firebase";
import AuthService from "../services/auth-service";

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    userId?: string;
    userInfo?: UserInfo;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: undefined,
  userInfo: undefined
};


export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
});

export const validateTokenAndLogin = createAsyncThunk(
  "auth/validateToken",
  async (token: string, thunkAPI) => {
    try {
      await AuthService.validate(token);
      thunkAPI.dispatch(setAuthenticated(true));
    } catch (e) {
        thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { setAuthenticated, setUserId, setUserInfo } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

const { reducer } = authSlice;
export default reducer;
