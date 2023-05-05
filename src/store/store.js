import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import SignupSlice from "./SignupSlice";
import LoginSlice from "./LoginSlice";
const Store = configureStore({
  reducer: {
    todoSlice,
    SignupSlice,
    LoginSlice,
  },
});
export default Store;
