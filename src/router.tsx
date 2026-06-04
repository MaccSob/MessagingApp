import { createBrowserRouter } from "react-router";
import LoginForm from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import Home from "./pages/home";

export const router = createBrowserRouter([
  {
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login", 
        element: <LoginForm />,
      },
      {
        path: "register", 
        element: <Register />,
      },
      {
        path: "chat", 
        element: <Chat />,
      },
      {
       path: "profile", 
        element: <Profile />,
      },
    ],
  },
]);