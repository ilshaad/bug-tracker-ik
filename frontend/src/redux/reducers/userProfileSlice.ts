import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface userProfileState {
  email: string | null;
  name: string | null; //from auth0 nickname
  role: string | null;
  created_on: string | null;
  avatar: string | null; // from auth0 picture
}

// Define the initial state using that type
const initialState: userProfileState = {
  email: null,
  name: null,
  role: null,
  created_on: null,
  avatar: null,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<userProfileState>) => {
      return { ...action.payload };
    },
    logoutAction: (state) => {
      state.email = null;
      state.name = null;
      state.role = null;
      state.created_on = null;
      state.avatar = null;
    },
  },
});

export const { loginAction, logoutAction } = userProfileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserProfile = (state: RootState) => state.userProfile;

export default userProfileSlice.reducer;
