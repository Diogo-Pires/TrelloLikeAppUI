import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from "../domain/User";
import { extractTokenInformation } from "../shared/ExtractTokenInformation";

interface AuthState {
  user: User | null;
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);

      const userInfo = extractTokenInformation(state.token);  
      if (userInfo) {
        state.user = action.payload.user;
      }
      
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;