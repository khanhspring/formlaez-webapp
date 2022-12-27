import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyLoad } from "./app/util/lazy-load";
import BlankLayout from "./app/layouts/blank";
import PrimaryLayout from "./app/layouts/primary";
import Workspace from "./app/pages/private";
import Error404 from "./app/pages/error/404";

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: "/",
        element: <Workspace />
      },
      {
        path: "/members",
        element: lazyLoad('member', 'list-member')
      },
      {
        path: "/teams",
        element: lazyLoad('team')
      },
      {
        path: "/teams/:teamCode",
        element: lazyLoad('team', 'team-detail')
      },
      {
        path: "/pages/:pageCode",
        element: lazyLoad('page')
      },
      {
        path: "teams/:teamCode/pages/:pageCode",
        element: lazyLoad('page')
      }
    ],
    errorElement: <Error404 />
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: lazyLoad('login')
      }
    ]
  },
]);

function App() {
  return (
    <div className="dark">
      <div className="min-h-[100vh] antialiased text-black dark:text-white bg-white dark:bg-cinder-900">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
