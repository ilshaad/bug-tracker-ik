import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { comments_type } from "../../../@types/commentsSlice_types";
import get_allCommentsForASingleTicket from "../../../controllers/commentsFetch/get_allCommentsForASingleTicket";
// import { get_allCommentsForASingleTicket } from "../../../controllers/commentsFetch";
import parseTimestamp from "../../../helpers/parseTimestamp";
import type { RootState } from "../../store";

// fetch all comments to one specific ticket
export const get_allCommentsForASingleTicket_actions = createAsyncThunk(
  "get/commentsForOneTicket",
  async (ticketId: string, thunkAPI) => {
    return get_allCommentsForASingleTicket(ticketId)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return thunkAPI.rejectWithValue(
          "Error occured with get_allCommentsForASingleTicket_action function"
        );
      });
  }
);

// Define the initial state using that type
const initialState: Array<comments_type> = [];

// TODO
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * get_allCommentsForASingleTicket_actions function
      // collect all comments for one specific ticket
      .addCase(
        get_allCommentsForASingleTicket_actions.fulfilled,
        (state, actions) => {
          // console.log(actions.payload);
          const { success, data } = actions.payload;

          // do not set state if success property (from SS response) returns false
          if (!success) return;

          // create a new immuntable state object with all the ticketlist
          const newArray_commentsForSingleTicket: Array<comments_type> = [
            ...data,
          ];

          // parse each comments created_on sql timestamp
          for (let item of newArray_commentsForSingleTicket) {
            item.created_on = parseTimestamp(item.created_on);
          }

          return newArray_commentsForSingleTicket;
        }
      )

      // return nothing if request fail
      .addCase(
        get_allCommentsForASingleTicket_actions.rejected,
        (state, actions) => {
          console.log(actions.payload);
        }
      );
  },
});

// export all actions
// export const { fetchAllTickets_actions } = ticketSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default commentsSlice.reducer;
