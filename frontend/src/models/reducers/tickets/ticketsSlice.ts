import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { get_ticketList } from "../../../controllers/ticketsFetch";

// Define a type for the slice state
interface TicketsState_type {
  ticket_id: string | null;
  title: string | null;
  description: string | null;
  submitted_by: string | null;
  priority: string | null;
  assigned_user: string | null;
  status: string | null;
  app_name: string | null;
  app_version: string | null;
  created_on: string | null;
}

// Define the initial state using that type
const initialState: Array<TicketsState_type> = [
  {
    ticket_id: null,
    title: null,
    description: null,
    submitted_by: null,
    priority: null,
    assigned_user: null,
    status: null,
    app_name: null,
    app_version: null,
    created_on: null,
  },
];

export const ticketSlice = createSlice({
  name: "tickets",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    fetchAllTickets_actions: (state) => {
      get_ticketList()
        .then((data) => {
          console.log(data);
          return [...state, ...data];
        })
        .catch((error) => {
          console.log(error);
        });
      // state[0].ticket_id = "iKtesting";
      // return [...state,   {
      //   ticket_id: null,
      //   title: null,
      //   description: 'I am modifications',
      //   submitted_by: null,
      //   priority: null,
      //   assigned_user: null,
      //   status: null,
      //   app_name: null,
      //   app_version: null,
      //   created_on: null,
      // },];
    },
  },
});

// export all actions
export const { fetchAllTickets_actions } = ticketSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default ticketSlice.reducer;
