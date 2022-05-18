/** List of actions creators
 * get_ticketList_actions()
 * post_createTicket_actions( newTicket )
 * patch_updateTicket_actions( updatedTicket )
 * delete_deleteTicket_actions( ticket_id )
 */

import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../store";
import timeStamp from "../../helpers/timeStamp";
import parseTimestamp from "../../helpers/parseTimestamp";

// import {
//   dictionary_ticketsState_type,
//   TicketsState_type,
// } from "../../../@types/TicketSlice_types";
import {
  createTicket_dispatch_type,
  dictionary_ticketsState_type,
  ticket_type,
} from "../../types/tickets_type";

import get_ticketList from "../../controllers/ticketsFetch/get_ticketList";
import post_createTicket from "../../controllers/ticketsFetch/post_createTicket";
// import { createTicket_dispatch_type } from "../../../@types/ticketsSlice_types.t";
import catchHandlerForReduxSlices from "../../helpers/catchHandlerForReduxSlices";
import patch_updateTicket from "../../controllers/ticketsFetch/patch_updateTicket";
import delete_deleteTicket from "../../controllers/ticketsFetch/delete_deleteTicket";

/************************************* */
/** *Fetch all tickets from psql > insert it within the ticket reducer */
export const get_ticketList_actions = createAsyncThunk(
  "get/ticketList",
  async (par, thunkAPI) => {
    return get_ticketList()
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // if request was a success & on the SS too, return data to insert into the ticket state
        return data;
      })
      .catch((error) => {
        if ("success" in error) {
          return thunkAPI.rejectWithValue(error.msg);
        }

        return thunkAPI.rejectWithValue(error);
      });
  }
);

/************************************** */
/** *Create a ticket > send to psql > if successful insert also into ticket reducer */
export const post_createTicket_actions = createAsyncThunk(
  "post/createTicket",
  async (newTicket: createTicket_dispatch_type, { rejectWithValue }) => {
    // create new UUID for ticket
    const ticket_id_uuid = uuidv4();

    // create timestamp
    const currentTimestamp = timeStamp();

    const ticketObject = {
      ...newTicket,
      ticket_id: ticket_id_uuid,
      created_on: currentTimestamp,
    };

    return post_createTicket(ticketObject)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return the ticketObject so we can insert the new ticket into the ticket reducer too
        return ticketObject;
      })
      .catch((error) => {
        if ("success" in error) {
          return rejectWithValue(error.msg);
        }

        return rejectWithValue(error);
      });
  }
);

/******************************************* */
/** *Update a ticket > update psql > if successful update ticket reducer too */
export const patch_updateTicket_actions = createAsyncThunk(
  "patch/updateATicket",
  async (updatedTicket: ticket_type, thunkAPI) => {
    return patch_updateTicket(updatedTicket)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return the updated ticket so we can update the ticket reducer too
        return updatedTicket;
      })
      .catch((error) => {
        if ("success" in error) {
          return thunkAPI.rejectWithValue(error.msg);
        }

        return thunkAPI.rejectWithValue(error);
      });
  }
);

/******************************************* */
/** *Delete a ticket > delete on psql > if successful delete on ticket reducer too */
export const delete_deleteTicket_actions = createAsyncThunk(
  "delete/deleteTicket",
  async (ticket_id: string, thunkAPI) => {
    return delete_deleteTicket(ticket_id)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return ticket_id so we can delete the ticket from the ticket reducer ticketlist too
        // I return ticket_id as object literal because it will assume I return data.msg string (above) & be considered as an error
        return { ticket_id };
      })
      .catch((error) => {
        if ("success" in error) {
          return thunkAPI.rejectWithValue(error.msg);
        }

        return thunkAPI.rejectWithValue(error);
      });
  }
);

/************************************ */
// Define the initial state using that type
const initialState: dictionary_ticketsState_type = {
  // null: {
  // ticket_id: null,
  // title: null,
  // description: null,
  // submitted_by: null,
  // priority: null,
  // assigned_user: null,
  // status: null,
  // app_name: null,
  // app_version: null,
  // created_on: null,
  // },
};

/******************************************* */
// Main ticket slice reducer
export const ticketsSlice = createSlice({
  name: "tickets",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // // when user is logged out reset to initialState
    // resetTicketsToInitialState_actions: (state, ) => {
    //   return initialState;
    // },
  },
  extraReducers: (builder) => {
    builder
      /******************************** */
      // * get_ticketList_actions function
      // collect all ticket list within redux as dictionary, so ticket id will be the property name for quicker access
      .addCase(get_ticketList_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the ticket reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "get_ticketList_actions",
            "ticketsSlice.ts",
            data
          );
          return;
        }

        // create a new immuntable state object with all the ticketlist
        const newDictionary_ticketsState: dictionary_ticketsState_type = {};

        for (let item of data.data) {
          // parse sql timestamp each date before placing within ticket state
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
        catchHandlerForReduxSlices(
          "get_ticketList_actions",
          "ticketsSlice.ts",
          actions.payload
        );
      })

      /******************************** */
      /** * post_createTicket_actions  */
      // if successful, include the new ticket within the ticket reducer
      .addCase(post_createTicket_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the ticket reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "post_createTicket_actions",
            "ticketsSlice.ts",
            data
          );
          return;
        }

        /**if SS successfully updated the db than include the new ticket within the ticket list state */
        // create new property with the ticket_id as its key name along with will the ticket data as value
        const newCreatedTicket = { [data.ticket_id]: { ...data } };

        return { ...state, ...newCreatedTicket };
      })

      .addCase(post_createTicket_actions.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "post_createdTicket_actions",
          "ticketsSlice.ts",
          actions.payload
        );
      })

      /******************************** */
      /** * patch_updateTicket_actions()  */
      // if successful, update the ticket in ticket reducer too
      .addCase(patch_updateTicket_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the ticket reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "patch_updateTicket_actions",
            "ticketsSlice.ts",
            data
          );
          return;
        }

        const ticket_id = data.ticket_id;

        /**if SS successfully updated the db than also update the single ticket withing the ticket list state */
        return { ...state, [ticket_id]: { ...data } };
      })

      .addCase(patch_updateTicket_actions.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "patch_updateTicket_actions",
          "ticketsSlice.ts",
          actions.payload
        );
      })

      /******************************** */
      /** * delete_deleteTicket_actions  */
      // if successful, delete the ticket in ticket reducer too
      .addCase(delete_deleteTicket_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the ticket reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "delete_deleteTicket_actions",
            "ticketsSlice.ts",
            data
          );
          return;
        }

        /**if SS successfully updated the db than delete ticket from the ticket state */
        // remove the single ticket from the state
        const ticketId = data.ticket_id;
        delete state[ticketId];
      })

      .addCase(delete_deleteTicket_actions.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "delete_deleteTicket_actions",
          "ticketsSlice.ts",
          actions.payload
        );
      });
  },
});

// export all actions
// export const { resetTicketsToInitialState_actions } = ticketsSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
// export const ticketListState = (state: RootState) => state.tickets;

export default ticketsSlice.reducer;
