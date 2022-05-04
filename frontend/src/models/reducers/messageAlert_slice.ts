import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface message_type {
  message: string | null;
}

// Define the initial state using that type
const initialState: message_type = {
  message: null,
};

export const messageAlert_slice = createSlice({
  name: "messageAlert",
  // `createSlice` will infor the state type from the `initialState` argument
  initialState,
  reducers: {
    messageAlert: (state, action) => {
      state.message = action.payload;
    },
    nullTheMessageAlert: (state) => {
      state.message = null;
    },
  },
});

export const { messageAlert, nullTheMessageAlert } = messageAlert_slice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default messageAlert_slice.reducer;
