import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  comment_type,
  createComment_dispatch_type,
} from "../../../@types/comments_type";
import delete_deleteComment from "../../../controllers/commentsFetch/delete_deleteComment";
import get_allCommentsForASingleTicket from "../../../controllers/commentsFetch/get_allCommentsForASingleTicket";
import patch_updateComment from "../../../controllers/commentsFetch/patch_updateComment";
import post_createComment from "../../../controllers/commentsFetch/post_createComment";
import catchHandlerForReduxSlices from "../../../helpers/catchHandlerForReduxSlices";
// import { get_allCommentsForASingleTicket } from "../../../controllers/commentsFetch";
import parseTimestamp from "../../../helpers/parseTimestamp";
import timeStamp from "../../../helpers/timeStamp";
import type { RootState } from "../../store";

/************************************** */
// * get_allCommentsForASingleTicket_actions function
// collect all comments for a single ticket >> parse the sql date (created_on) >> insert into comments reducer
export const get_allCommentsForASingleTicket_actions = createAsyncThunk(
  "get/commentsForOneTicket",
  async (ticketId: string, thunkAPI) => {
    return get_allCommentsForASingleTicket(ticketId)
      .then((data) => {
        // console.log(data);

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
// * post_createComments_actions function
// user post a new comment on a ticket
/************************************** */
export const post_createComments_action = createAsyncThunk(
  "post/createComment",
  async (newComment: createComment_dispatch_type, { rejectWithValue }) => {
    // create new UUID for ticket
    const comment_id_uuid = uuidv4();

    // create timestamp
    const currentTimestamp = timeStamp();

    const commentObject = {
      ...newComment,
      comment_id: comment_id_uuid,
      created_on: currentTimestamp,
    };

    return post_createComment(commentObject)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return the commentObject so we can insert the new comment into the comment reducer too
        return commentObject;
      })
      .catch((error) => {
        if ("success" in error) {
          return rejectWithValue(error.msg);
        }

        return rejectWithValue(error);
      });
  }
);

/************************************** */
// * patch_updateComment_actions function
// user updates their comment
export const patch_updateComment_actions = createAsyncThunk(
  "patch/updateComment",
  async (commentObject: comment_type, thunkAPI) => {
    return patch_updateComment(commentObject)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return the commentObject so we can insert the new comment into the comment reducer too
        return commentObject;
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
// * delete_deleteComments function
// user delete their comment
export const delete_deleteComment_actions = createAsyncThunk(
  "delete/deleteComment",
  async (comment_id: string, thunkAPI) => {
    return delete_deleteComment(comment_id)
      .then((data) => {
        // return msg text if SS response object property 'success' is false
        if (!data.success) return data.msg;

        // return the comment_id so we can remove the comment from comment reducer too
        // I return comment_id as object literal because it will assume I return data.msg string (above) & be considered as an error
        return { comment_id };
      })
      .catch((error) => {
        if ("success" in error) {
          return thunkAPI.rejectWithValue(error.msg);
        }

        return thunkAPI.rejectWithValue(error);
      });
  }
);

/******************************** */
// Define the initial state using that type
// state of array full of objects
const initialState: Array<comment_type> = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /******************************** */
      // * get_allCommentsForASingleTicket_actions function
      // collect all comments for a single ticket >> parse the sql date (created_on) >> insert into comments reducer
      .addCase(
        get_allCommentsForASingleTicket_actions.fulfilled,
        (state, actions) => {
          const data = actions.payload;

          // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
          // also do not update the comments reducer;
          if (typeof data === "string") {
            catchHandlerForReduxSlices(
              "get_allCommentsForASingleTicket_actions",
              "commentsSlice.ts",
              data
            );
            return;
          }

          const newCommentArrays: Array<comment_type> = [];

          for (let item of data.data) {
            // parse sql timestamp each date before placing within comments state
            const parseCreated_on = parseTimestamp(item.created_on);

            let commentsObject = item;

            commentsObject.created_on = parseCreated_on;

            newCommentArrays.push(commentsObject);
          }

          return [...newCommentArrays];
        }
      )

      // return nothing if request fail
      .addCase(
        get_allCommentsForASingleTicket_actions.rejected,
        (state, actions) => {
          catchHandlerForReduxSlices(
            "get_allCommentsForASingleTicket_actions",
            "commentsSlice.ts",
            actions.payload
          );
        }
      )

      /******************************** */
      /** * post_createComments_action  */
      // if successful, include the new comment within the comment reducer
      .addCase(post_createComments_action.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the comment reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "post_createComments_action",
            "commentsSlice.ts",
            data
          );
          return;
        }

        /**if SS successfully updated the db than include the new comment within the comment list state */
        return [...state, data];
      })

      .addCase(post_createComments_action.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "post_createComments_action",
          "commentsSlice.ts",
          actions.payload
        );
      })

      /******************************** */
      /** * patch_updateComment_actions  */
      // if successful, update the comment within the comment reducer too
      .addCase(patch_updateComment_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the comment reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "patch_updateComment_actions",
            "commentsSlice.ts",
            data
          );
          return;
        }

        /**if SS successfully updated the db than include the updated comment within the comment list state too */
        return state.map((item) => {
          if (item.comment_id === data.comment_id) {
            return data;
          }
          return item;
        });
      })

      .addCase(patch_updateComment_actions.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "patch_updateComment_actions",
          "commentsSlice.ts",
          actions.payload
        );
      })

      /******************************** */
      /** * delete_deleteComment_actions  */
      // if successful, delete the comment within the comment reducer too
      .addCase(delete_deleteComment_actions.fulfilled, (state, actions) => {
        const data = actions.payload;

        // if data is 'string' than I have return the SS 'msg' property which will be string data from SS giving more details on about the err
        // also do not update the comment reducer;
        if (typeof data === "string") {
          catchHandlerForReduxSlices(
            "delete_deleteComment_actions",
            "commentsSlice.ts",
            data
          );
          return;
        }

        /**if SS successfully updated the db than delete the comment within the comment state list too */
        return state.filter((item) => item.comment_id !== data.comment_id);
      })

      .addCase(delete_deleteComment_actions.rejected, (state, actions) => {
        catchHandlerForReduxSlices(
          "delete_deleteComment_actions",
          "commentsSlice.ts",
          actions.payload
        );
      });
  },
});

// export all actions
// export const { fetchAllTickets_actions } = ticketSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default commentsSlice.reducer;
