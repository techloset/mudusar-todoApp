import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
const SignupSlice = createSlice({
  name: "Signup",
  initialState: { success: false },
  reducers: {
    setSuccesss: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignupAuth.fulfilled, (state, action) => {
      state.success = action.payload;
    });
  },
});
export const { setSuccesss } = SignupSlice.actions;
export default SignupSlice.reducer;
export const SignupAuth = createAsyncThunk(
  "signupAuthentication",
  async (dispatch, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        dispatch.email,
        dispatch.password
      );
      toast.success("SignUp Successfully");
      return true;
    } catch (error) {
      console.log(error, "error from SignupSlice");
      toast.error("error");
    }
  }
);
