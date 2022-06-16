import { configureStore } from "@reduxjs/toolkit";

// !delete
// import counterSlice from "./reducers/counterSlice";

// ! no longer required since auth0 will handle my users details
// import userProfileSlice from "./reducers/userProfileSlice";

import ticketsSlice from "./reducers/tickets_slice";
import commentsSlice from "./reducers/comments_slice";
import messageToast_slice from "./reducers/messageToast_slice";

const store = configureStore({
  reducer: {
    tickets: ticketsSlice,
    comments: commentsSlice,
    messageToasts: messageToast_slice,

    // counter: counterSlice,
    // userProfile: userProfileSlice,
  },
  // devTools: false,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
