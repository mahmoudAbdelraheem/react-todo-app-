import { createBrowserRouter } from "react-router-dom";
import Todo from "./components/todo/Todo";
import Login from "./components/auth/Login/Login";
import RegisterForm from "./components/auth/Register/RegisterForm";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);
export default routers;
