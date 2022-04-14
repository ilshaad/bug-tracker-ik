import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./reducers/counterSlice";
import userProfileSlice from "./reducers/userProfileSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    userProfile: userProfileSlice,
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
