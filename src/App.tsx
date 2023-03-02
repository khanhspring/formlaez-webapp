import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./app/components/common/loading";
import { RequireAuth } from "./app/components/common/require-auth";
import BlankLayout from "./app/layouts/blank";
import OnlyFooterLayout from "./app/layouts/only-footer";
import PrimaryLayout from "./app/layouts/primary";
import Error401 from "./app/pages/auth/error-401";
import LoginCode from "./app/pages/auth/login-code";
import Logout from "./app/pages/auth/logout";
import Error from "./app/pages/error/Error";
import Workspace from "./app/pages/private";
import UserSessionService from "./app/services/user-session-service";
import { lazyLoad } from "./app/util/lazy-load";

const loader = async () => {
  try {
    const userSession = await UserSessionService.getCurrentUserSession();
    console.log(userSession)
    if (!userSession.onboarded) {
      return redirect('/onboarding');
    }
    return userSession;
  } catch (e) {
    // return null to avoid error
    return null;
  }
};

const router = createBrowserRouter([
  {
    id: 'root',
    errorElement: <Error />,
    children: [
      {
        id: 'private',
        loader: loader,
        children: [
          {
            element: <PrimaryLayout />,
            children: [
              {
                path: "/",
                element: <RequireAuth><Workspace /></RequireAuth>
              },
              {
                path: "/members",
                element: lazyLoad('member/list-member', true)
              },
              {
                path: "/teams",
                element: lazyLoad('team', true)
              },
              {
                path: "/teams/:teamCode",
                element: lazyLoad('team/team-detail', true)
              },
              {
                path: "private/forms/:formCode",
                element: lazyLoad('form', true)
              },
              {
                path: "teams/:teamCode/forms/:formCode",
                element: lazyLoad('form', true)
              },
              {
                path: "private/forms/:formCode/print-templates",
                element: lazyLoad('form/print-templates', true)
              },
              {
                path: "teams/:teamCode/forms/:formCode/print-templates",
                element: lazyLoad('form/print-templates', true)
              },
              {
                path: "private/forms/:formCode/settings",
                element: lazyLoad('form/form-settings', true)
              },
              {
                path: "teams/:teamCode/forms/:formCode/settings",
                element: lazyLoad('form/form-settings', true)
              }
            ],
          },
          {
            element: <BlankLayout />,
            children: [
              {
                path: "teams/:teamCode/forms/:formCode/preview",
                element: lazyLoad('form/form-preview', true)
              },
              {
                path: "private/forms/:formCode/preview",
                element: lazyLoad('form/form-preview', true)
              },
            ]
          },
          {
            element: <OnlyFooterLayout />,
            children: [
              {
                path: "teams/:teamCode/forms/:formCode/edit",
                element: lazyLoad('form/form-edit', true)
              },
              {
                path: "private/forms/:formCode/edit",
                element: lazyLoad('form/form-edit', true)
              },
              {
                path: "private/forms/:formCode/full",
                element: lazyLoad('form/data-full-screen', true)
              },
              {
                path: "teams/:teamCode/forms/:formCode/full",
                element: lazyLoad('form/data-full-screen', true)
              },
              {
                path: "workspaces/setup",
                element: lazyLoad('workspace/setup', true)
              }
            ]
          }
        ]
      },
      {
        id: 'onboarding',
        children: [
          {
            path: "onboarding",
            element: lazyLoad('onboarding', true)
          },
        ]
      },
      {
        id: 'public',
        element: <BlankLayout />,
        children: [
          {
            path: "/login",
            element: lazyLoad('login')
          },
          {
            path: "login/code",
            element: <LoginCode />
          },
          {
            path: "logout",
            element: <Logout />
          },
          {
            path: "errors/401",
            element: <Error401 />
          }
        ]
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
      <RouterProvider router={router} fallbackElement={<Loading center />} />
    </>
  );
}

export default App;
