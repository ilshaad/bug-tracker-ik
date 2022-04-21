import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../../store";
import timeStamp from "../../../helpers/timeStamp";
import parseTimestamp from "../../../helpers/parseTimestamp";

import {
  dictionary_ticketsState_type,
  TicketsState_type,
} from "../../../@types/TicketSlice_types";
import { createTicket_type } from "../../../@types/backendFetch_types";

import get_ticketList from "../../../controllers/ticketsFetch/get_ticketList";
import post_createTicket from "../../../controllers/ticketsFetch/post_createTicket";
import { createTicket_dispatch_type } from "../../../@types/ticketsSlice_types.t";

/** *Fetch all tickets from psql > insert it within the ticket reducer */
export const get_ticketList_actions = createAsyncThunk(
  "get/ticketList",
  async (par, thunkAPI) => {
    return get_ticketList()
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return thunkAPI.rejectWithValue(
          "Error occured with get_ticketList_action function"
        );
      });
  }
);

/** *Create a ticket > send to psql > if successful insert also into ticket reducer */
export const post_createTicket_actions = createAsyncThunk(
  "post/createTicket",
  async (newTicket: createTicket_dispatch_type, { rejectWithValue }) => {
    // create new UUID for ticket
    const uuid = uuidv4();

    // create timestamp
    const currentTimestamp = timeStamp();

    const ticketObject = {
      ...newTicket,
      ticket_id: uuid,
      created_on: currentTimestamp,
    };

    return post_createTicket(ticketObject)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return rejectWithValue("Error occured with post_createTicket_actions");
      });
  }
);

/** *Update a ticket > update psql > if successful update ticket reducer too */

/** *Delete a ticket > delete on psql > if successful delete on ticket reducer too */

// Define the initial state using that type
const initialState: dictionary_ticketsState_type = {
  null: {
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
};

export const ticketSlice = createSlice({
  name: "tickets",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /******************************** */
      // * get_ticketList_actions function
      // collect all ticket list within redux as dictionary, so ticket id will be the property name for quicker access
      .addCase(get_ticketList_actions.fulfilled, (state, actions) => {
        // console.log(actions.payload);
        const { success, data } = actions.payload;

        // do not set state if success property (from SS response) returns false
        if (!success) return;

        // create a new immuntable state object with all the ticketlist
        const newDictionary_ticketsState: dictionary_ticketsState_type = {};

        for (let item of data) {
          // console.log(item);
          // parse sql timestamp before placing within ticket state
          const parseCreated_on = parseTimestamp(item.created_on);

          newDictionary_ticketsState[item.ticket_id] = {
            ticket_id: item.ticket_id,
            title: item.title,
            description: item.description,
            submitted_by: item.submitted_by,
            priority: item.priority,
            assigned_user: item.assigned_user,
            status: item.status,
            app_name: item.app_name,
            app_version: item.app_version,
            created_on: parseCreated_on,
          };
        }

        return newDictionary_ticketsState;
      })

      // return nothing if request fail
      .addCase(get_ticketList_actions.rejected, (state, actions) => {
        console.log(actions.payload);
      })

      /******************************** */
      /** * post_createTicket_actions  */
      // if successful, include the new ticket within the ticket reducer
      .addCase(post_createTicket_actions.fulfilled, (state, actions) => {
        const { success, data } = actions.payload;

        // do not set state if success property (from SS response) returns false
        if (!success) return;
      })

      .addCase(post_createTicket_actions.rejected, (state, actions) => {
        console.log("iK rejected for the create ticket");
      });
  },
});

// export all actions
// export const { fetchAllTickets_actions } = ticketSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default ticketSlice.reducer;
