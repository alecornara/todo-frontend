import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import goalReducer from "./goalSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    goals: goalReducer,
  },
});