// import { fetchMyAccount } from "@/api/services/account.service";
import { decodeToken } from "@/utils/decode-jwt-token";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: { status: "loading" | "faild" | "succeeded" | null; data: any | null };
  role: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken") || null,
  user: { status: null, data: null },
  role: decodeToken(localStorage.getItem("accessToken"))?.role || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.user.data = null;
      state.user.status = null;
      localStorage.removeItem("accessToken");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user.data = null;
    },
    // Not used for yet
    updateUserStatus: (state, action) => {
      state.user.status = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
