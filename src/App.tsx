import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Account from "./pages/account/account";
import Login from "./pages/account/login/login";
import RootLayout from "./pages/root/rootLayout";
import Projects from "./pages/root/project/project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/project",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/account",
    element: <Account />,
    children: [{ path: "/account/login", element: <Login /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
