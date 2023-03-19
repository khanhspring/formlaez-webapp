import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import AuthService from "../services/auth-service";
import TokenStorageService, { removeToken, saveToken } from "../services/token-storage-service";
import JwtUtils from "../util/jwt-utils";

export type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    userId: string;
    userInfo?: UserInfo;
}

const token = TokenStorageService.getToken();
let uid = undefined;
let userInfo: UserInfo | undefined = undefined;
if (token) {
  const jwt = JwtUtils.parseJwt(token);
  uid = jwt.uid;

  userInfo = {
    id: jwt.uid,
    firstName: jwt['first_name'],
    lastName: jwt['last_name'],
    email: jwt['email']
  }
}

const initialState: AuthState = {
  isAuthenticated: !!token,
  userId: uid,
  userInfo: userInfo
};

export const getToken = createAsyncThunk(
  "auth/getToken",
  async (code: string, thunkAPI) => {
    try {
      removeToken();
      const response = await AuthService.getTokenByCode(code);
      const token = response.accessToken;
      saveToken(token);
      thunkAPI.dispatch(login(token));
    } catch (e) {
        thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
        const jwt = JwtUtils.parseJwt(action.payload);
        state.isAuthenticated = true;
        state.userId = jwt.uid;
        const userInfo: UserInfo = {
          id: jwt.uid,
          firstName: jwt['first_name'],
          lastName: jwt['last_name'],
          email: jwt['email'],
        }
        state.userInfo = userInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { login } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

const { reducer } = authSlice;
export default reducer;
