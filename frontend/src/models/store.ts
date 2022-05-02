import { configureStore } from "@reduxjs/toolkit";

// !delete
import counterSlice from "./reducers/counterSlice";

import ticketsSlice from "./reducers/tickets/ticketsSlice";
import commentsSlice from "./reducers/comments/commentsSlice";
import userProfileSlice from "./reducers/userProfileSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    userProfile: userProfileSlice,
    tickets: ticketsSlice,
    comments: commentsSlice,
  },
  // devTools: false,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;