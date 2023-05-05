import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc as newDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
const todoSlice = createSlice({
  name: "todoslice",
  initialState: {
    todos: [],
    userName: "",
    abc: {},
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoItem.pending, (state, action) => {
        toast.loading("loading");
      })
      .addCase(addTodoItem.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload];
        toast.dismiss();
        toast.success("Successfully Added");
      })
      .addCase(addTodoItem.rejected, (state, action) => {
        toast.dismiss();
        toast.error("error in slice");
      })

      .addCase(getTodos.pending, (state, action) => {
        toast.loading("fetching todos");
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        toast.dismiss();
      })
      .addCase(getTodos.rejected, (state, action) => {
        toast.error("error while fetching todos");
      })

      .addCase(deleteTodo.pending, (state, action) => {
        toast.loading("deleting todo");
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        let newArray = state.todos.filter((item) => {
          if (item.id === action.payload) {
            return;
          } else {
            return item;
          }
        });
        state.todos = newArray;
        toast.dismiss();
        toast.success("deleted successfully");
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        toast.error("error");
      })

      .addCase(updateDoc.pending, (state, action) => {})
      .addCase(updateDoc.fulfilled, (state, action) => {
        let newArray = state.todos.map((item) => {
          if (item.id === action.payload.id) {
            item.todo = action.payload.todo;
          } else {
            return item;
          }
        });
        toast.success("updated");
      })
      .addCase(updateDoc.rejected, (state, action) => {
        toast.error("error in updating");
      });
  },
});

export const { setUserName } = todoSlice.actions;
export default todoSlice.reducer;

export const addTodoItem = createAsyncThunk(
  "add/todo",
  async (dispatch, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const docRef = await addDoc(
        collection(db, `${state.todoSlice.userName}`),
        {
          todo: dispatch,
        }
      );
      return { todo: dispatch, id: docRef.id };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTodos = createAsyncThunk(
  "get/todo",
  async (dispatch, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const querySnapshot = await getDocs(
        collection(db, `${state.todoSlice.userName}`)
      );
      const todoList = [];
      querySnapshot.forEach((doc) => {
        const todo = { id: doc.id, ...doc.data() };
        todoList.push(todo);
      });
      return todoList;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "delete/todo",
  async (dispatch, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      await deleteDoc(doc(db, `${state.todoSlice.userName}`, dispatch));
      return dispatch;
    } catch (error) {}
  }
);

export const updateDoc = createAsyncThunk(
  "update/doc",
  async (dispatch, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const washingtonRef = doc(db, `${state.todoSlice.userName}`, dispatch.id);
      newDoc(washingtonRef, {
        todo: dispatch.todo,
      });
      return dispatch;
    } catch (error) {}
  }
);
