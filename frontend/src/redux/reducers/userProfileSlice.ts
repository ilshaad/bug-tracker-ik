import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface userProfileState {
  loggedIn?: boolean;
  email: string | null;
  name: string | null;
  role: string | null;
  created_on: string | null;
}

// Define the initial state using that type
const initialState: userProfileState = {
  loggedIn: false,
  email: null,
  name: null,
  role: null,
  created_on: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userProfileState>) => {
      (state.loggedIn = true),
        (state.email = action.payload.email),
        (state.name = action.payload.name),
        (state.role = action.payload.role),
        (state.created_on = action.payload.created_on);
    },
    logout: (state) => {
      (state.loggedIn = false),
        (state.email = null),
        (state.name = null),
        (state.role = null),
        (state.created_on = null);
    },
  },
});

export const { login, logout } = userProfileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserProfile = (state: RootState) => state.userProfile;

export default userProfileSlice.reducer;
