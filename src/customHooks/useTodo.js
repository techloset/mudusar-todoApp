import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTodoItem,
  getTodos,
  deleteTodo,
  updateDoc,
} from "../store/todoSlice";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { setSuccess, setIsLogin } from "../store/LoginSlice";
import { setSuccesss } from "../store/SignupSlice";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../store/todoSlice";
const useTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [updated, setUpdated] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let name = user.email.split("@");
        dispatch(setSuccess(false));
        dispatch(setSuccesss(false));
        dispatch(setIsLogin(true));
        dispatch(setUserName(`${name[0]}`));
        dispatch(getTodos());
      }
    });
  }, []);
  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(setIsLogin(false));

      toast.success("Log out Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const signUp = () => {
    navigate("/signup");
  };
  const login = () => {
    navigate("/login");
  };
  const addTodo = () => {
    if (todo === "") {
      toast.error("Enter a todo");
    } else {
      dispatch(addTodoItem(todo));
      setTodo("");
    }
  };
  const deleteFun = (id) => {
    dispatch(deleteTodo(id));
  };
  const update = (valueToUpdate, idOfItem) => {
    setTodo(valueToUpdate);
    setUpdated(true);
    setId(idOfItem);
  };
  const updateFun = () => {
    dispatch(updateDoc({ id, todo }));
    setTodo("");
    setUpdated(false);
  };
  return {
    addTodo,
    todo,
    setTodo,
    signOutUser,
    signUp,
    login,
    deleteFun,
    updateFun,
    update,
    updated,
  };
};

export default useTodo;
