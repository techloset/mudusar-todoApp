import React from "react";
import useTodo from "../customHooks/useTodo";
import { useSelector } from "react-redux";
const Todo = () => {
  const {
    addTodo,
    todo,
    setTodo,
    signOutUser,
    signUp,
    login,
    updateFun,
    deleteFun,
    update,
    updated,
  } = useTodo();
  const todos = useSelector((state) => state.todoSlice.todos);
  const isLogin = useSelector((state) => state.LoginSlice.isLogin);
  const name = useSelector((state) => state.todoSlice.userName);
  const newName = name.toUpperCase();
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-purple-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-xl tracking-tight">Todo App</span>
        </div>
        <div className="flex">
          <button
            onClick={login}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-purple-500 hover:border-purple-500"
          >
            Login
          </button>
          {isLogin ? (
            <div className="flex items-center">
              {/* <select className="ml-4 rounded-sm">
                <option value="">{name}</option>
              </select> */}
              <button
                onClick={signOutUser}
                className="ml-4 flex gap-2 items-center px-3 py-2 border rounded text-white border-white hover:bg-white hover:text-purple-500 hover:border-purple-500"
              >
                Sign Out
                <h1 className="">{newName}</h1>
              </button>
            </div>
          ) : (
            <button
              onClick={signUp}
              className="ml-4 flex items-center px-3 py-2 border rounded text-white border-white hover:bg-white hover:text-purple-500 hover:border-purple-500"
            >
              Sign Up
            </button>
          )}
        </div>
      </nav>
      <h1 className="text-center text-purple-800 text-4xl font-bold font-serif my-10">
        Todo App
      </h1>
      <div className="flex justify-center flex-col items-center">
        <div className="bg-gray-100 rounded-md p-4 flex items-center w-[60%]">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Enter text"
          />
          {!updated ? (
            <button
              onClick={isLogin ? addTodo : login}
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 ml-2 rounded"
            >
              Add
            </button>
          ) : (
            <button
              onClick={() => updateFun()}
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 ml-2 rounded"
            >
              Update
            </button>
          )}
        </div>

        {todos.map((item) => {
          return (
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-between w-[60%] mt-5">
              <h1>{item?.todo}</h1>
              <div>
                <button
                  onClick={(e) => deleteFun(item.id)}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 ml-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => update(item.todo, item.id)}
                  className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 ml-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
