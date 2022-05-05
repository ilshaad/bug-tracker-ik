// to pass messages onto other routes to use as toast
// .eg user creates a ticket, they are redirected to dashboard page but a toast alert message confirming they successfully or failed created a ticket

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

export const messageToast_slice = createSlice({
  name: "messageToast",
  // `createSlice` will infor the state type from the `initialState` argument
  initialState,
  reducers: {
    // create a message
    messageToast_actions: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    // nullify the message back to normal after the message toast finish displaying
    nullTheMessageToast_actions: (state) => {
      state.message = null;
    },
  },
});

export const { messageToast_actions, nullTheMessageToast_actions } =
  messageToast_slice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default messageToast_slice.reducer;
