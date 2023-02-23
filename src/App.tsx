import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyLoad } from "./app/util/lazy-load";
import BlankLayout from "./app/layouts/blank";
import PrimaryLayout from "./app/layouts/primary";
import Workspace from "./app/pages/private";
import Error404 from "./app/pages/error/404";
import OnlyFooterLayout from "./app/layouts/only-footer";
import { ToastContainer } from "react-toastify";

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
        path: "private/forms/:formCode",
        element: lazyLoad('form')
      },
      {
        path: "teams/:teamCode/forms/:formCode",
        element: lazyLoad('form')
      },
      {
        path: "private/forms/:formCode/print-templates",
        element: lazyLoad('form', 'print-templates')
      },
      {
        path: "teams/:teamCode/forms/:formCode/print-templates",
        element: lazyLoad('form', 'print-templates')
      },
      {
        path: "private/forms/:formCode/settings",
        element: lazyLoad('form', 'form-settings')
      },
      {
        path: "teams/:teamCode/forms/:formCode/settings",
        element: lazyLoad('form', 'form-settings')
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
  {
    element: <OnlyFooterLayout />,
    children: [
      {
        path: "teams/:teamCode/forms/:formCode/edit",
        element: lazyLoad('form', 'form-edit')
      },
      {
        path: "private/forms/:formCode/edit",
        element: lazyLoad('form', 'form-edit')
      },
      {
        path: "private/forms/:formCode/full",
        element: lazyLoad('form', 'data-full-screen')
      },
      {
        path: "teams/:teamCode/forms/:formCode/full",
        element: lazyLoad('form', 'data-full-screen')
      }
    ]
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        hideProgressBar
        closeButton={false}
        theme="dark"
        toastClassName="min-h-0"
        bodyClassName="py-0 px-1"
        className="text-sm w-auto"
        position="top-center"
        limit={3}
        autoClose={3500}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
