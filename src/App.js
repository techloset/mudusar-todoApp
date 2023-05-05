import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TodoApp from "./pages/Todo";
import { Provider } from "react-redux";
import Store from "./store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={Store}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<TodoApp />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
