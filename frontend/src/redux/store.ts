import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./reducers/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  // devTools: false,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
