import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./actions"

export default configureStore({
  reducer: {
    task:taskReducer,
  },
})