import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'components/counter/counterSlice'
import taskReducer from 'components/tasks/task.slice';
import postReduer from 'features/posts/post.slice'
import authReducer from 'features/auth/auth.slice'
export const store = configureStore({
  reducer: {
    shomarande : counterReducer,
    taskList : taskReducer,
    posts : postReduer,
    auth : authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch