import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Account from "./pages/root/account/accountLayout";
import Login from "./pages/root/account/login/login";
import RootLayout from "./pages/root/rootLayout";
import Projects from "./pages/root/app/project/project";
import AppLayout from "./pages/root/app/appLayout";
import Test from "./pages/root/app/test/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/account",
        element: <Account />,
        children: [{ path: "/account/login", element: <Login /> }],
      },
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "/app/project",
            element: <Projects />,
          },
        ],
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
